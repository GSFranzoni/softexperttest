<?php

namespace App\Http\Controller;

use App\DataTransferObject\LoginDTO;
use App\DataTransferObject\RegisterDTO;
use App\Exception\DomainException;
use App\Http\Middleware\AuthenticateMiddleware;
use App\Persistence\Entity\User;
use App\Persistence\Enums\UserRole;
use App\Persistence\Repository\UserRepository;
use App\Service\LoginService;
use App\Service\RegisterService;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;

class AuthController
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * @var LoginService
     */
    private LoginService $loginService;

    /**
     * @var RegisterService
     */
    private RegisterService $registerService;

    public function __construct() { // Todo: use a DI container to inject dependencies
        $this->userRepository = new UserRepository();
        $this->loginService = new LoginService($this->userRepository);
        $this->registerService = new RegisterService($this->userRepository);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function login(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $body = $request->getParsedBody();
        try {
            $token = $this->loginService->execute(new LoginDTO(
                $body['email'] ?? null,
                $body['password'] ?? null
            ));
            $response->getBody()->write(
                json_encode(['token' => $token])
            );
            return $response->withStatus(200);
        }
        catch (DomainException $e) {
            $response->getBody()->write(
                json_encode(['message' => $e->getMessage()])
            );
            return $response->withStatus(401);
        }
        catch (Throwable) {
            $response->getBody()->write(
                json_encode(['message' => 'Internal server error'])
            );
            return $response->withStatus(500);
        }
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function register(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $body = $request->getParsedBody();
        try {
            $this->registerService->execute(new RegisterDTO(
                email: $body['email'] ?? null,
                password: $body['password'] ?? null,
                name: $body['name'] ?? null,
                role: UserRole::from($body['role'] ?? null)
            ));
            $response->getBody()->write(
                json_encode(['message' => 'User created successfully'])
            );
            return $response->withStatus(200);
        }
        catch (DomainException $e) {
            $response->getBody()->write(
                json_encode(['message' => $e->getMessage()])
            );
            return $response->withStatus(400);
        } catch (Throwable $t) {
            $response->getBody()->write(
                json_encode(['message' => 'Internal server error'])
            );
            return $response->withStatus(500);
        }
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function me(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $token = substr($request->getHeaderLine(AuthenticateMiddleware::TOKEN_HEADER), strlen(AuthenticateMiddleware::TOKEN_PREFIX));

        $payload = JWT::decode($token, new Key(getenv('JWT_SECRET'), getenv('JWT_ALGORITHM')));

        /** @var User $user */
        $user = $this->userRepository->find($payload->user);

        $response->getBody()->write(
            json_encode($user)
        );

        return $response->withStatus(200);
    }
}