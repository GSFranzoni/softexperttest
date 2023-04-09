<?php

namespace App\Http\Controller;

use App\Exception\DomainException;
use App\Persistence\Repository\UserRepository;
use App\Service\DeleteUserService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;

class UserController
{
    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    /**
     * @var DeleteUserService
     */
    private DeleteUserService $deleteUserService;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
        $this->deleteUserService = new DeleteUserService($this->userRepository);
    }

    public function index(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $users = $this->userRepository->findAll();
        $response->getBody()->write(
            json_encode([
                'users' => $users,
            ])
        );
        return $response->withStatus(200);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function show(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = $args['id'];
        $user = $this->userRepository->find($id);
        $response->getBody()->write(
            json_encode($user)
        );
        return $response->withStatus(200);
    }

    public function store(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $response->getBody()->write(
            json_encode([])
        );
        return $response->withStatus(200);
    }

    public function update(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = $args['id'];
        $response->getBody()->write(
            json_encode([])
        );
        return $response->withStatus(200);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function destroy(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $id = $args['id'];
        try {
            $this->deleteUserService->execute($id);
        } catch (DomainException $e) {
            $response->getBody()->write(
                json_encode([
                    'error' => $e->getMessage(),
                ])
            );
            return $response->withStatus(400);
        } catch (Throwable) {
            $response->getBody()->write(
                json_encode([
                    'error' => 'Internal server error',
                ])
            );
            return $response->withStatus(500);
        }
        $response->getBody()->write(json_encode([
            'message' => 'User deleted successfully',
        ]));
        return $response->withStatus(200);
    }

}