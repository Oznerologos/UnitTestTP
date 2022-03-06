import { act as actRender, render, screen } from '@testing-library/react';

import { renderHook, act } from "@testing-library/react-hooks";
import ReactDOM from "react-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";
import useProduct from '../hooks/useProduct';


const server = setupServer(

    rest.post(
        "http://localhost:8000/api/cart/2",
        (req, res, ctx) => {
            return res(
                ctx.json(
                    {

                        "id": 1,
                        "name": "Add Product",
                        "price": "45.6",
                        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                        "quantity": 20,

                    }
                ))
        })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());


test("addProduct", async () => {
    const { result } = renderHook(() => useProduct({
        "id": 1,
        "name": "Rick Sanchez",
        "price": "45.6",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "quantity": 20,
    }));
    const { loading, addProduct } = result.current;
    expect(loading).toEqual(false);
    await act(async () => {
        await addProduct();
    }
    );
    const { quantity } = result.current;
    expect(quantity).toEqual(1);
});