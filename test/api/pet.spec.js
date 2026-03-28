const supertest = require("supertest");

const createdPetId = 173218101;

describe("API PetStore Swagger - Entidade Pet", () => {
  jest.setTimeout(20000);
  const request = supertest("https://petstore.swagger.io/v2");
  const petDDT = require("../../vendors/json/petDDT.json");
  const petUpdateDDT = require("../../vendors/json/petUpdateDDT.json");

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
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(createdPetId);
        expect(response.body.name).toBe("dog");
        expect(response.body.category.name).toBe("begas");
        expect(response.body.tags[0].name).toBe("pending");
      });
  });

  it("Get Pet", () => {
    return request.get(`/pet/${createdPetId}`).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(createdPetId);
      expect(response.body.status).toBe("available");
    });
  });

  it("Delete Pet", () => {
    return request.delete(`/pet/${createdPetId}`).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.type).toBe("unknown");
      expect(response.body.message).toBe(`${createdPetId}`);
    });
  });

  it.each(petDDT)("Post Pet DDT: %s", async (data) => {
    return request
      .post("/pet")
      .send({
        id: data.idPet,
        name: data.namePet,
        category: {
          id: data.category_id,
          name: data.category_name,
        },
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(data.idPet);
        expect(response.body.name).toBe(data.namePet);
        expect(response.body.category.id).toBe(data.category_id);
        expect(response.body.category.name).toBe(data.category_name);
      });
  });

  it.each(petDDT)("Get Pet DDT: %s", async (data) => {
    return (reponse = request.get(`/pet/${data.idPet}`).then((response) => {
      {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(data.idPet);
      }
    }));
  });

  it.each(petUpdateDDT)("Update Pet DDT: %s", async (data) => {
    return request
      .put("/pet")
      .send({
        id: data.idPet,
        name: data.namePet,
        category: {
          id: data.category_id,
          name: data.category_name,
        },
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(data.idPet);
        expect(response.body.name).toBe(data.namePet);
        expect(response.body.category.id).toBe(data.category_id);
        expect(response.body.category.name).toBe(data.category_name);
      });
  });

  it.each(petDDT)("Delete Pet DDT: %s",async(data)=>{
    return request.delete(`/pet/${data.idPet}`).then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.code).toBe(200);
      expect(response.body.type).toBe("unknown");
      expect(response.body.message).toBe(`${data.idPet}`);
    })
  })
});
