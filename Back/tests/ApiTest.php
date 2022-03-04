<?php

namespace App\Tests;

use App\Service\RickAndMortyApiService;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Bundle\FrameworkBundle\Test\TestCase;


class ApiTest extends WebTestCase
{



    public function testApiAddition(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testFindAll(): void 
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);

        $this->assertIsArray($responseData);

    }

    public function testFindByID()
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products/1');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
 
        $this->assertEquals($responseData,[[  "id" => 1,
        "name" => "Rick Sanchez",
        "price" => "20",
        "quantity" => 5,
        "image" => "https://rickandmortyapi.com/api/character/avatar/1.jpeg"]]);
    }
    
    public function testAddToCart()
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/1', ['quantity'=>1]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        
        $this->assertEquals($responseData,
            [  
                "id" => 1,
                "products" => 
                [[
                    "id"=> 1,
                    "name"=> "Rick Sanchez",
                    "price" => "20",
                    "quantity" => 5,
                    "image"=> "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                ]]
            ]
        );
    }


    public function testAddToCartTooMany()
    {
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/1', ['quantity'=>100000]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        
        $this->assertEquals($responseData,
        ["error" => "too many"]
        );
    }

    public function testAllInCart()
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/cart');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        
        $this->assertEquals($responseData,
            [  
                "id" => 1,
                "products" => 
                [[
                    "id"=> 1,
                    "name"=> "Rick Sanchez",
                    "price" => "20",
                    "quantity" => 5,
                    "image"=> "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                ]]
            ]
        );
    }


    public function testDeleteFromCart()
    {
        $client = static::createClient();
        $client->jsonRequest('DELETE', '/api/cart/1');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        
        $this->assertEquals($responseData,
            [  
                "id" => 1,
                "products" => []
            ]
        );     
    }

    
}
