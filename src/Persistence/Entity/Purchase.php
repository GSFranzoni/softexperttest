<?php

namespace App\Persistence\Entity;

use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

#[ORM\Embeddable]
#[ORM\Table(name: "purchases")]
#[ORM\Entity]
#[ORM\HasLifecycleCallbacks]
class Purchase implements JsonSerializable// Todo: maybe rename to Order
{
    #[ORM\Id]
    #[ORM\Column(name: "id", type: Types::INTEGER)]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    private int | null $id;

    #[ORM\OneToMany(mappedBy: "purchase", targetEntity: PurchasedProduct::class, cascade: ["persist", "remove"])]
    #[ORM\JoinColumn(name: "id", referencedColumnName: "purchase_id")]
    private Collection $products;

    #[ORM\Column(name: "total", type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private float $total;

    #[ORM\Column(name: "tax", type: Types::DECIMAL, precision: 10, scale: 2, nullable: false)]
    private float $tax;

    #[ORM\Column(name: "created_at", type: Types::DATETIME_IMMUTABLE, nullable: false)]
    private DateTimeImmutable $date;

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->total = 0.0;
        $this->tax = 0.0;
        $this->date = new DateTimeImmutable();
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
     * @return Collection
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    /**
     * @param Collection $products
     */
    public function setProducts(Collection $products): void
    {
        $this->products = $products;
    }

    /**
     * @param PurchasedProduct $product
     * @return void
     */
    public function addProduct(PurchasedProduct $product): void
    {
        $this->products->add($product);
    }

    /**
     * @return float
     */
    public function getTotal(): float
    {
        return $this->total;
    }

    /**
     * @param float $total
     */
    public function setTotal(float $total): void
    {
        $this->total = $total;
    }

    /**
     * @return DateTimeImmutable
     */
    public function getDate(): DateTimeImmutable
    {
        return $this->date;
    }

    /**
     * @param DateTimeImmutable $date
     */
    public function setDate(DateTimeImmutable $date): void
    {
        $this->date = $date;
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
            'id' => $this->id,
            'products' => $this->products->toArray(),
            'total' => $this->total,
            'date' => $this->date->format('Y-m-d H:i:s'),
            'tax' => $this->tax
        ];
    }
}