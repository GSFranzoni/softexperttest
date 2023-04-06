<?php

namespace App\Persistence\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Id;
use JsonSerializable;

#[ORM\Entity]
#[ORM\Table(name: "purchased_products")]
class PurchasedProduct implements JsonSerializable
{
    #[Id]
    #[Column(name: "id", type: Types::INTEGER)]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    private int | null $id;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: "products")]
    #[ORM\JoinColumn(name: "product_id", referencedColumnName: "id")]
    private Product $product;

    #[ORM\ManyToOne(targetEntity: Purchase::class, cascade: ["persist"], inversedBy: "purchases")]
    #[ORM\JoinColumn(name: "purchase_id", referencedColumnName: "id")]
    private Purchase $purchase;

    #[Column(name: "quantity", type: Types::INTEGER, nullable: false)]
    private int $quantity;

    #[Column(name: "price", type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private int $price;

    #[Column(name: "total", type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private int $total;

    #[Column(name: "tax", type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private float $tax;

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
     * @return Product
     */
    public function getProduct(): Product
    {
        return $this->product;
    }

    /**
     * @param Product $product
     */
    public function setProduct(Product $product): void
    {
        $this->product = $product;
    }

    /**
     * @return Purchase
     */
    public function getPurchase(): Purchase
    {
        return $this->purchase;
    }

    /**
     * @param Purchase $purchase
     */
    public function setPurchase(Purchase $purchase): void
    {
        $this->purchase = $purchase;
    }

    /**
     * @return int
     */
    public function getQuantity(): int
    {
        return $this->quantity;
    }

    /**
     * @param int $quantity
     */
    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }

    /**
     * @return int
     */
    public function getPrice(): int
    {
        return $this->price;
    }

    /**
     * @param int $price
     */
    public function setPrice(int $price): void
    {
        $this->price = $price;
    }

    /**
     * @return int
     */
    public function getTotal(): int
    {
        return $this->total;
    }

    /**
     * @param int $total
     */
    public function setTotal(int $total): void
    {
        $this->total = $total;
    }

    /**
     * @return float
     */
    public function getTax(): float
    {
        return $this->tax;
    }

    /**
     * @param float $tax
     */
    public function setTax(float $tax): void
    {
        $this->tax = $tax;
    }

    /**
     * @return array
     */
    public function jsonSerialize(): array
    {
        return [
            "id" => $this->id,
            "product" => $this->product,
            "quantity" => $this->quantity,
            "price" => $this->price,
            "total" => $this->total,
            "tax" => $this->tax
        ];
    }
}