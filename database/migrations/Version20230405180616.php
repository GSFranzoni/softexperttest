<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230405180616 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create products category table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('products_category');

        $table->addColumn('id', 'integer', [
            'autoincrement' => true,
            'notnull' => true,
        ]);

        $table->addColumn('description', 'string', [
            'length' => 255,
            'notnull' => true,
        ]);

        $table->addColumn('tax', 'float', [
            'notnull' => true,
        ]);

        $table->setPrimaryKey(['id']);

        $table->addUniqueIndex(['description']);

        $table->addIndex(['tax']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('products_category');
    }
}
