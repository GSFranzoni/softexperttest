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
class PurchasedProduct
{
    /** @var ?int */
    #[Id]
    #[Column(name: "id", type: "integer")]
    #[GeneratedValue(strategy: "IDENTITY")]
    private int | null $id;

    /** @var Product */
    #[Column(name: "product", type: "Product", nullable: false)]
    private Product $product;

    /** @var int */
    #[Column(name: "quantity", type: "integer", nullable: false)]
    private int $quantity;

    /** @var Purchase */
    #[Column(name: "purchase", type: "Purchase", nullable: false)]
    private Purchase $purchase;

    /**
     * @param Product $product
     * @param int $quantity
     * @param Purchase $purchase
     */
    public function __construct(Product $product, int $quantity, Purchase $purchase)
    {
        $this->product = $product;
        $this->quantity = $quantity;
        $this->purchase = $purchase;
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
}