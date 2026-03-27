const supertest = require("supertest");

const createdPetId = 173218101;

describe("API PetStore Swagger - Entidade Pet", () => {
  const request = supertest("https://petstore.swagger.io/v2");

  it("Post Pet", () => {
    const pet = require("../../vendors/json/pet.json");
    return request
      .post("/pet")
      .send(pet)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(createdPetId);
        expect(response.body.name).toBe("dog");
        expect(response.body.category.name).toBe("begas");
        expect(response.body.tags[0].name).toBe("pending");
      });
  });

  it("Update Pet", async () => {
    const pet = require("../../vendors/json/petUpdate.json");
    return request
      .put("/pet")
      .send(pet)
      .then((response)=>{
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(createdPetId);
        expect(response.body.name).toBe("dog");
        expect(response.body.category.name).toBe("begas");
        expect(response.body.tags[0].name).toBe("pending");
      })
  });

  it("Get Pet",() => {
    return request
        .get(`/pet/${createdPetId}`)
        .then((response)=>{
            expect(response.statusCode).toBe(200)
            expect(response.body.id).toBe(createdPetId)
            expect(response.body.status).toBe("available")
        })
  });

  it("Delete Pet",()=>{
    return request
        .delete(`/pet/${createdPetId}`)
        .then((response)=>{
            expect(response.statusCode).toBe(200)
            expect(response.body.code).toBe(200)
            expect(response.body.type).toBe("unknown")
            expect(response.body.message).toBe(`${createdPetId}`)
        })
  })
});
