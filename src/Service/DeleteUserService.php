<?php

namespace App\Service;

use App\Exception\DomainException;
use App\Exception\ResourceNotFoundException;
use App\Persistence\Enums\UserRole;
use App\Persistence\Repository\UserRepository;

class DeleteUserService
{
    public function __construct(
        private readonly UserRepository $repository
    ) {
    }

    /**
     * @param string $id
     * @param string $loggedUserId
     * @return void
     * @throws DomainException
     * @throws ResourceNotFoundException
     */
    public function execute(string $id, string $loggedUserId): void
    {
        if ($id === $loggedUserId) {
            throw new DomainException("You can't delete yourself");
        }
        
        $user = $this->repository->find($id);

        if (empty($user)) {
            throw new ResourceNotFoundException("User not found");
        }

        $admins = $this->repository->count(['role' => UserRole::ADMIN]);

        if ($admins === 1 && $user->getRole() === UserRole::ADMIN) {
            throw new DomainException("You can't delete the last admin");
        }

        $this->repository->delete($user);
    }
}