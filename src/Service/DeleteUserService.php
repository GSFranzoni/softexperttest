<?php

namespace App\Service;

use App\Exception\DomainException;
use App\Exception\ResourceNotFoundException;
use App\Persistence\Enums\UserRole;
use App\Persistence\Repository\UserRepository;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;

class DeleteUserService
{
    public function __construct(
        private readonly UserRepository $repository
    ) {
    }

    /**
     * @param string $id
     * @return void
     * @throws DomainException
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws ResourceNotFoundException
     * @throws TransactionRequiredException
     */
    public function execute(string $id): void
    {
        $user = $this->repository->find($id);

        if (empty($user)) {
            throw new ResourceNotFoundException("User not found");
        }

        if ($user->getRole() === UserRole::ADMIN) { // Todo: verify if it's necessary
            throw new DomainException("You can't delete an admin user");
        }

        $this->repository->delete($user);
    }
}