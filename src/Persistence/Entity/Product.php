<?php

namespace App\Persistence\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Id;
use JsonSerializable;

#[ORM\Entity]
#[ORM\Table(name: "products")]
class Product implements JsonSerializable
{
    #[Id]
    #[Column(name: "id", type: Types::INTEGER)]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    private int | null $id;

    #[Column(name: "name", type: Types::STRING, length: 255, nullable: false)]
    private string $name;

    #[Column(name: "description", type: Types::STRING, length: 255, nullable: false)]
    private string $description;

    #[Column(name: "price", type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private float $price;

    #[Column(name: "stock", type: Types::INTEGER, nullable: false)]
    private int $stock;

    #[Column(name: "image", type: Types::STRING, length: 255, nullable: false)]
    private string $image;

    #[ORM\ManyToOne(targetEntity: ProductCategory::class, inversedBy: "products")]
    #[ORM\JoinColumn(name: "category_id", referencedColumnName: "id")]
    private ProductCategory $category;

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


    /**
     * @return array
     */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'stock' => $this->stock,
            'image' => $this->image,
            'category' => $this->category
        ];
    }
}