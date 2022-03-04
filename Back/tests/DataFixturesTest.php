<?php
use App\DataFixtures\AppFixtures;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\RickAndMortyGestion;

class DataFixturesTest extends KernelTestCase
{
    protected function setUp(): void {
        parent::setUp();
        exec("php bin/console doctrine:database:drop --env=test --force");
        exec("php bin/console doctrine:database:create --env=test");
        exec("php bin/console doctrine:migration:migrate -n --env=test");
    }
    public function testFixutres()
    {
        $appFixtures = self::getContainer()->get(AppFixtures::class);
        $objectManager = self::getContainer()->get(EntityManagerInterface::class);
        $gestionTest = self::getContainer()->get(RickAndMortyGestion::class);
        $appFixtures->load($objectManager);

        $this->assertCount(20, $gestionTest->findAll());
        // tester si les fixtures sont bien load
        // faire le mock pour éviter l'appel à chaques fois
    }
}