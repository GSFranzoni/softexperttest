<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230405180805 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create products table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('products');

        $table->addColumn('id', 'integer', [
            'autoincrement' => true,
            'notnull' => true,
        ]);

        $table->addColumn('name', 'string', [
            'length' => 255,
            'notnull' => true,
        ]);

        $table->addColumn('description', 'string', [
            'length' => 255,
            'notnull' => true,
        ]);

        $table->addColumn('price', 'float', [
            'notnull' => true,
        ]);

        $table->addColumn('stock', 'integer', [
            'notnull' => true,
        ]);

        $table->addColumn('image', 'string', [
            'length' => 255,
            'notnull' => true,
        ]);

        $table->addColumn('category_id', 'integer', [
            'notnull' => true,
        ]);

        $table->setPrimaryKey(['id']);

        $table->addUniqueIndex(['name']);

        $table->addIndex(['price']);

        $table->addIndex(['stock']);

        $table->addIndex(['category_id']);

        $table->addForeignKeyConstraint('products_category', ['category_id'], ['id'], ['onUpdate' => 'CASCADE', 'onDelete' => 'CASCADE']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('products');
    }
}
