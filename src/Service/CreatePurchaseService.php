<?php

namespace App\Service;

use App\DataTransferObject\CreatePurchaseDTO;
use App\Exception\DomainException;
use App\Exception\ResourceNotFoundException;
use App\Persistence\Entity\Product;
use App\Persistence\Entity\Purchase;
use App\Persistence\Entity\PurchasedProduct;
use App\Persistence\Repository\ProductRepository;
use App\Persistence\Repository\PurchasedProductRepository;
use App\Persistence\Repository\PurchaseRepository;

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
     * @throws DomainException
     * @throws ResourceNotFoundException
     */
    public function execute(CreatePurchaseDTO $input): void
    {
        $purchase = new Purchase();
        foreach ($input->products as $purchasedProductDTO) {
            /** @var ?Product $product */
            $product = $this->productRepository->find($purchasedProductDTO->id);
            if (is_null($product)) {
                throw new ResourceNotFoundException("Product $purchasedProductDTO->id not found");
            }
            if ($product->getStock() < $purchasedProductDTO->quantity) {
                throw new DomainException("Product $purchasedProductDTO->id has insufficient stock");
            }
            $category = $product->getCategory();
            $tax = $category->getTax();
            $purchasedProduct = new PurchasedProduct();
            $purchasedProduct->setProduct($product);
            $purchasedProduct->setPurchase($purchase);
            $purchasedProduct->setQuantity($purchasedProductDTO->quantity);
            $purchasedProduct->setPrice($product->getPrice());
            $purchasedProduct->setTotal($product->getPrice() * $purchasedProductDTO->quantity);
            $purchasedProduct->setTax($product->getPrice() * $purchasedProductDTO->quantity * $tax->getPercent());
            $purchase->addProduct($purchasedProduct);
            $product->setStock($product->getStock() - $purchasedProductDTO->quantity);
            $purchase->setTotal($purchase->getTotal() + $product->getPrice() * $purchasedProductDTO->quantity);
            $purchase->setTax($purchase->getTax() + $purchasedProduct->getTax());
            $this->purchasedProductRepository->save($purchasedProduct);
            $this->productRepository->save($product);
        }
        $this->purchaseRepository->save($purchase);
    }
}