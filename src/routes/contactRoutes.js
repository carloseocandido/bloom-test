const express = require('express');
const ContactController = require('../controllers/ContactController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contatos
 *   description: Operações relacionadas a contatos
 */

/**
 * @swagger
 * /create:
 *   post:
 *     tags: [Contatos]
 *     summary: Cria um novo contato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contato criado com sucesso
 */
router.post('/create', ContactController.create);

/**
 * @swagger
 * /contacts:
 *   get:
 *     tags: [Contatos]
 *     summary: Lista todos os contatos
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra contatos por nome (opcional)
 *       - in: query
 *         name: address
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra contatos pela cidade (opcional)
 *       - in: query
 *         name: email
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra contatos pelo e-mail (opcional)
 *       - in: query
 *         name: phone
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra contatos pelo telefone (opcional)
 *     responses:
 *       200:
 *         description: Lista de contatos
 */
router.get('/contacts', ContactController.list);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags: [Contatos]
 *     summary: Exibe um contato específico mesmo se estiver desativado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       200:
 *         description: Detalhes do contato
 */
router.get('/contacts/:id', ContactController.listById);

/**
 * @swagger
 * /contacts/{id}:
 *  put:
 *     tags: [Contatos]
 *     summary: Atualiza um contato
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contato atualizado com sucesso
 */
router.put('/contacts/:id', ContactController.update);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags: [Contatos]
 *     summary: Exclui logicamente um contato
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       200:
 *         description: Contato deletado com sucesso
 */
router.delete('/contacts/:id', ContactController.delete);

module.exports = router;