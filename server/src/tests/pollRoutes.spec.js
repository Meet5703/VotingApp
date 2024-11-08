import { test, expect } from "@playwright/test";

let token;
let pollId;
let optionId;
// test("Signup test", async ({ request }) => {
//   const response = await request.post(
//     "http://localhost:3000/api/v1/users/signup",
//     {
//       data: {
//         username: "td1",
//         email: "ex2@example.com",
//         password: "meet2003",
//       },
//     }
//   );
//   expect(response.status()).toBe(201);
//   const responseBody = await response.json();
//   // expect(responseBody).toHaveProperty("token");
//   console.log(responseBody);
// });
test("Signin test", async ({ request }) => {
  const response = await request.post(
    "http://localhost:3000/api/v1/users/signin",
    {
      data: {
        email: "ex2@example.com",
        password: "meet2003",
      },
    }
  );
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("token");
  token = responseBody.token;
  //   console.log(responseBody);
});

test("Create a Poll", async ({ request }) => {
  const pollData = {
    title: "Test Poll",
    questions: [
      {
        question: "Test Question",
        options: [{ option: "Javascript" }, { option: "cpp" }],
      },
    ],
  };

  const response = await request.post("http://localhost:3000/api/v1/polls", {
    headers: {
      Cookie: `token=${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(pollData),
  });

  //   console.log("Response Status:", response.status());
  const responseBody = await response.text();
  expect(response.status()).toBe(201);
  const jsonData = await response.json();
  expect(jsonData.data).toHaveProperty("_id");
  pollId = jsonData.data._id;
  optionId =
    jsonData.data.questions[0].options[Math.floor(Math.random() * 2)]._id;
});

test("Get Polls Associated With User", async ({ request }) => {
  const response = await request.get("http://localhost:3000/api/v1/polls/all", {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.text();
  //   console.log("Response Body:", responseBody);
});

test("Vote on Poll", async ({ request }) => {
  const response = await request.post(
    `http://localhost:3000/api/v1/polls/vote/${pollId}?optionId=${optionId}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );

  expect(response.status()).toBe(200);
  //   console.log("Response Body:", await response.text());
});

test("Update Poll", async ({ request }) => {
  const updateObject = {
    title: "Updated Title",
    questions: [
      {
        question: "Updated Question",
        options: [{ option: "Updated Javascript" }, { option: "Updated cpp" }],
      },
    ],
  };

  const response = await request.put(
    `http://localhost:3000/api/v1/polls/${pollId}`,
    {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
      data: updateObject,
    }
  );

  expect(response.status()).toBe(200);
  const responseBody = await response.text();
  //   console.log("Response Body:", responseBody);
});
test("Delete Poll", async ({ request }) => {
  const response = await request.delete(
    `http://localhost:3000/api/v1/polls/${pollId}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  expect(response.status()).toBe(200);
  const responseBody = await response.text();
  //   console.log("Response Body:", responseBody);
});
