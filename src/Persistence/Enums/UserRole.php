<?php

namespace App\Persistence\Enums;

enum UserRole: string {
    case ADMIN = 'admin';
    case REGULAR = 'regular';
}