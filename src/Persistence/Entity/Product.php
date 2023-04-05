<?php

namespace App\Data\Entity;

/*
 * @Table(name="products")
 * @HasLifecycleCallbacks
 * @Entity(repositoryClass="App\Data\Repository\ProductRepository")
*/

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;

/**
 * @ORM\Embeddable
 */
class Product
{
    /**  @var ?int */
    #[Id]
    #[Column(name: "id", type: "integer")]
    #[GeneratedValue(strategy: "IDENTITY")]
    private int | null $id;

    /** @var string */
    #[Column(name: "name", type: "string", length: 255, nullable: false)]
    private string $name;

    /** @var string */
    #[Column(name: "description", type: "string", length: 255, nullable: false)]
    private string $description;

    /** @var float */
    #[Column(name: "price", type: "float", nullable: false)]
    private float $price;

    /** @var int */
    #[Column(name: "stock", type: "integer", nullable: false)]
    private int $stock;

    /** @var string */
    #[Column(name: "image", type: "string", length: 255, nullable: false)]
    private string $image;

    /** @var ProductCategory */
    #[Column(name: "category", type: "ProductCategory", nullable: false)]
    private ProductCategory $category;

    /**
     * @param string $name
     * @param string $description
     * @param float $price
     * @param int $stock
     * @param string $image
     * @param ProductCategory $category
     */
    public function __construct(
        string $name,
        string $description,
        float $price,
        int $stock,
        string $image,
        ProductCategory $category
    ) {
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->stock = $stock;
        $this->image = $image;
        $this->category = $category;
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param int|null $id
     */
    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return float
     */
    public function getPrice(): float
    {
        return $this->price;
    }

    /**
     * @param float $price
     */
    public function setPrice(float $price): void
    {
        $this->price = $price;
    }

    /**
     * @return int
     */
    public function getStock(): int
    {
        return $this->stock;
    }

    /**
     * @param int $stock
     */
    public function setStock(int $stock): void
    {
        $this->stock = $stock;
    }

    /**
     * @return string
     */
    public function getImage(): string
    {
        return $this->image;
    }

    /**
     * @param string $image
     */
    public function setImage(string $image): void
    {
        $this->image = $image;
    }

    /**
     * @return ProductCategory
     */
    public function getCategory(): ProductCategory
    {
        return $this->category;
    }

    /**
     * @param ProductCategory $category
     */
    public function setCategory(ProductCategory $category): void
    {
        $this->category = $category;
    }
}