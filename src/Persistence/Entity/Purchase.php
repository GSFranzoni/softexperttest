<?php

namespace App\Data\Entity;

use DateTimeImmutable;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Embeddable
 * @ORM\Table(name="purchases")
 * @ORM\Entity(repositoryClass="App\Data\Repository\PurchaseRepository")
 * @ORM\HasLifecycleCallbacks
 * @ORM\ChangeTrackingPolicy("DEFERRED_EXPLICIT")
 * @ORM\InheritanceType("SINGLE_TABLE")
 */
class Purchase
{
    /** @var ?int */
    #[ORM\Id]
    #[ORM\Column(name: "id", type: "integer")]
    #[ORM\GeneratedValue(strategy: "IDENTITY")]
    private int | null $id;

    /** @var Collection<int, Product> */
    #[ORM\OneToMany(mappedBy: "purchase", targetEntity: "PurchasedProduct")]
    private Collection $products;

    /** @var float */
    #[ORM\Column(name: "total", type: "float", nullable: false)]
    private float $total;

    /** @var DateTimeImmutable */
    #[ORM\Column(name: "date", type: "string", length: 255, nullable: false)]
    private DateTimeImmutable $date;

    /**
     * @param Collection $products
     * @param float $total
     * @param DateTimeImmutable $date
     */
    public function __construct(Collection $products, float $total, DateTimeImmutable $date)
    {
        $this->products = $products;
        $this->total = $total;
        $this->date = $date;
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
}