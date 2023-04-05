<?php

namespace App\Service;

use App\Data\Entity\Product;
use App\Data\Entity\ProductCategory;
use App\Data\Entity\Purchase;
use App\Data\Entity\PurchasedProduct;
use App\DataTransferObject\CreateProductDTO;
use App\DataTransferObject\CreatePurchaseDTO;
use App\Persistence\Repository\ProductCategoryRepository;
use App\Persistence\Repository\ProductRepository;
use DateTime;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Symfony\Component\Validator\Constraints\Collection;

class CreatePurchaseService
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly ProductCategoryRepository $productCategoryRepository
    ) {
    }

    /**
     * @param CreatePurchaseDTO $input
     * @return void
     * @throws EntityNotFoundException
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    public function execute(CreatePurchaseDTO $input): void
    {
        $purchase = new Purchase(
            products: new ArrayCollection([]),
            total: 0,
            date: new DateTimeImmutable()
        );
        foreach ($input->products as $purchasedProductDTO) {
            /** @var ?Product $product */
            $product = $this->productRepository->getById($purchasedProductDTO->productId);
            if (is_null($product)) {
                throw new EntityNotFoundException("Product $purchasedProductDTO->productId not found");
            }
            if ($product->getStock() < $purchasedProductDTO->quantity) {
                throw new EntityNotFoundException("Product $purchasedProductDTO->productId has insufficient stock");
            }
            $purchaseProduct = new PurchasedProduct(
                product: $product,
                quantity: $purchasedProductDTO->quantity,
                purchase: $purchase,
            );
            $purchase->addProduct($purchaseProduct);
            $product->setStock($product->getStock() - $purchasedProductDTO->quantity);
            $purchase->setTotal($purchase->getTotal() + $product->getPrice() * $purchasedProductDTO->quantity);
        }
        $this->productRepository->save($purchase);
    }
}