<?php

namespace App\DataTransferObject;

use App\Exception\ValidationException;
use App\Persistence\Enums\UserRole;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegisterDTO extends AbstractDTO
{
    #[NotBlank]
    public string $email;

    #[NotBlank]
    public string $password;

    #[NotBlank]
    public string $name;

    #[NotBlank]
    public UserRole $role;

    /**
     * @param string $email
     * @param string $password
     * @param string $name
     * @param UserRole $role
     * @throws ValidationException
     */
    public function __construct(
        string $email,
        string $password,
        string $name,
        UserRole $role
    ) {
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
        $this->role = $role;

        parent::__construct();
    }
}