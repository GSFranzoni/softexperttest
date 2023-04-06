<?php

namespace App\Service;

use App\DataTransferObject\CreatePurchaseDTO;
use App\Persistence\Entity\Product;
use App\Persistence\Entity\Purchase;
use App\Persistence\Entity\PurchasedProduct;
use App\Persistence\Repository\ProductRepository;
use App\Persistence\Repository\PurchasedProductRepository;
use App\Persistence\Repository\PurchaseRepository;
use Doctrine\ORM\EntityNotFoundException;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;

class CreatePurchaseService
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly PurchasedProductRepository $purchasedProductRepository,
        private readonly PurchaseRepository $purchaseRepository
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
        $purchase = new Purchase();
        $this->purchaseRepository->save($purchase);
        foreach ($input->products as $purchasedProductDTO) {
            /** @var ?Product $product */
            $product = $this->productRepository->getById($purchasedProductDTO->productId);
            if (is_null($product)) {
                throw new EntityNotFoundException("Product $purchasedProductDTO->productId not found");
            }
            if ($product->getStock() < $purchasedProductDTO->quantity) {
                throw new EntityNotFoundException("Product $purchasedProductDTO->productId has insufficient stock");
            }
            $purchasedProduct = new PurchasedProduct();
            $purchasedProduct->setProduct($product);
            $purchasedProduct->setPurchase($purchase);
            $purchasedProduct->setQuantity($purchasedProductDTO->quantity);
            $purchasedProduct->setPrice($product->getPrice());
            $purchasedProduct->setTotal($product->getPrice() * $purchasedProductDTO->quantity);
            $purchase->addProduct($purchasedProduct);
            $product->setStock($product->getStock() - $purchasedProductDTO->quantity);
            $purchase->setTotal($purchase->getTotal() + $product->getPrice() * $purchasedProductDTO->quantity);
            $this->purchasedProductRepository->save($purchasedProduct);
        }
        $this->purchaseRepository->save($purchase);
    }
}