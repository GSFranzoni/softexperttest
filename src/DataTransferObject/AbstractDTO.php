<?php

namespace App\DataTransferObject;

use App\Exception\ValidationException;
use Symfony\Component\Validator\ValidatorBuilder;

abstract class AbstractDTO
{
    /**
     * @throws ValidationException
     */
    public function __construct()
    {
        $validator = (new ValidatorBuilder())->getValidator();
        $errors = $validator->validate($this);
        if (count($errors) > 0) {
            throw new ValidationException($errors);
        }
    }
}