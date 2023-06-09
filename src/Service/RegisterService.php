<?php

namespace App\Service;

use App\DataTransferObject\RegisterDTO;
use App\Exception\UserAlreadyExistsException;
use App\Persistence\Entity\User;
use App\Persistence\Repository\UserRepository;

class RegisterService
{
    public function __construct(
        private readonly UserRepository $repository
    ) {
    }

    /**
     * @param RegisterDTO $register
     * @return void
     * @throws UserAlreadyExistsException
     */
    public function execute(RegisterDTO $register): void
    {
        $existingUser = $this->repository->findOneBy(['email' => $register->email]);
        if (!empty($existingUser)) {
            throw new UserAlreadyExistsException("User already exists");
        }
        $user = new User();
        $user->setName($register->name);
        $user->setRole($register->role);
        $user->setEmail($register->email);
        $user->setPassword($register->password);
        $this->repository->save($user);
    }
}