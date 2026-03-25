import mega from "@/config/";

test("adds 1 + 2 to equal 3", async () => {
  console.log(await mega.getAccountInfo());
  expect(1 + 2).toBe(3);
});
