<?php

namespace App\Persistence\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Id;

#[ORM\Entity]
#[ORM\Table(name: "purchased_products")]
class PurchasedProduct
{
    #[Id]
    #[Column(name: "id", type: Types::INTEGER)]
    private int | null $id;

    #[Column(name: "product_id", type: Product::class, nullable: false)]
    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: "products")]
    #[ORM\JoinColumn(name: "product_id", referencedColumnName: "id")]
    private Product $product;

    #[Column(name: "purchase_id", type: "Purchase", nullable: false)]
    #[ORM\ManyToOne(targetEntity: Purchase::class, inversedBy: "purchases")]
    #[ORM\JoinColumn(name: "purchase_id", referencedColumnName: "id")]
    private Purchase $purchase;

    #[Column(name: "quantity", type: Types::INTEGER, nullable: false)]
    private int $quantity;

    #[Column(name: "price", type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private int $price;

    #[Column(name: "total", type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private int $total;

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
}