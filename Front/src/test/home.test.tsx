import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks';
import useHome from "../hooks/useHome";

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/products",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    products: [{ "id": 2, "name": "Rick Sanchez", "price": "15", "quantity": 20, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/1.jpeg" }, { "id": 3, "name": "Morty Smith", "price": "15", "quantity": 0, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/2.jpeg" }, { "id": 4, "name": "Summer Smith", "price": "20", "quantity": 30, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/3.jpeg" }, { "id": 5, "name": "Beth Smith", "price": "8", "quantity": 0, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/4.jpeg" }, { "id": 6, "name": "Jerry Smith", "price": "16.50", "quantity": 0, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/5.jpeg" }, { "id": 7, "name": "Abadango Cluster Princess", "price": "15", "quantity": 5, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/6.jpeg" }, { "id": 8, "name": "Abradolf Lincler", "price": "8", "quantity": 0, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/7.jpeg" }, { "id": 9, "name": "Adjudicator Rick", "price": "8", "quantity": 20, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/8.jpeg" }, { "id": 10, "name": "Agency Director", "price": "16.50", "quantity": 70, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/9.jpeg" }, { "id": 11, "name": "Alan Rails", "price": "9,99", "quantity": 5, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/10.jpeg" }, { "id": 12, "name": "Albert Einstein", "price": "16.50", "quantity": 70, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/11.jpeg" }, { "id": 13, "name": "Alexander", "price": "8", "quantity": 30, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/12.jpeg" }, { "id": 14, "name": "Alien Googah", "price": "8", "quantity": 30, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/13.jpeg" }, { "id": 15, "name": "Alien Morty", "price": "20", "quantity": 5, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/14.jpeg" }, { "id": 16, "name": "Alien Rick", "price": "16.50", "quantity": 2, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/15.jpeg" }, { "id": 17, "name": "Amish Cyborg", "price": "8", "quantity": 2, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/16.jpeg" }, { "id": 18, "name": "Annie", "price": "16.50", "quantity": 5, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/17.jpeg" }, { "id": 19, "name": "Antenna Morty", "price": "15", "quantity": 20, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/18.jpeg" }, { "id": 20, "name": "Antenna Rick", "price": "8", "quantity": 20, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/19.jpeg" }, { "id": 21, "name": "Ants in my Eyes Johnson", "price": "20", "quantity": 30, "image": "https:\/\/rickandmortyapi.com\/api\/character\/avatar\/20.jpeg" }]
                }
                )
            )
        }
    )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loading", async () => {
    const { result } = renderHook(() => useHome());
    const { loading, loadProducts } = result.current;
    expect(loading).toEqual(true);
    await act(async () => { await loadProducts() });
    const { products } = result.current;
    console.log(products)
});