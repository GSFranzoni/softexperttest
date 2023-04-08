<?php

namespace App\Service;

use App\DataTransferObject\LoginDTO;
use App\Exception\ResourceNotFoundException;
use App\Exception\UnauthorizationException;
use App\Persistence\Repository\UserRepository;
use Firebase\JWT\JWT;

class LoginService
{
    public function __construct(
        private readonly UserRepository $repository
    ) {
    }

    /**
     * @param LoginDTO $login
     * @return string
     * @throws ResourceNotFoundException
     * @throws UnauthorizationException
     */
    public function execute(LoginDTO $login): string
    {
        $user = $this->repository->findByEmail($login->email);
        if (empty($user)) {
            throw new ResourceNotFoundException("User not found");
        }
        if (!password_verify($login->password, $user->getPassword())) {
            throw new UnauthorizationException("Invalid credentials");
        }
        return JWT::encode([
            'user' => $user->getId(),
            'iat' => time(),
            'exp' => time() + (int) getenv('JWT_EXPIRATION_TIME'),
        ], getenv('JWT_SECRET'), getenv('JWT_ALGORITHM'));
    }
}