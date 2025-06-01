import React, { useState, useEffect } from 'react';
import { addUserGrupo6, editUserGrupo6 } from '../services/userServiceGrupo6';

const UserFormGrupo6 = ({ selectedUser, onSaved }) => {
    const [user, setUser] = useState({
        nome: '',
        email: '',
        senha_hash: '',
        matricula: '',
        usuario: '',
        tipo: 'Aluno'
    });

    useEffect(() => {
        if (selectedUser) {
            setUser(selectedUser);
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.id) {
            await editUserGrupo6(user);
        } else {
            await addUserGrupo6(user);
        }

        setUser({
            nome: '',
            email: '',
            senha_hash: '',
            matricula: '',
            usuario: '',
            tipo: 'Aluno'
        });

        onSaved();
    };

    return (
        <div>
            <h2>{user.id ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
            <form onSubmit={handleSubmit}>
                <input name="nome" placeholder="Nome" value={user.nome} onChange={handleChange} required />
                <input name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
                <input name="senha_hash" placeholder="Senha" value={user.senha_hash} onChange={handleChange} required />
                <input name="matricula" placeholder="Matrícula" value={user.matricula} onChange={handleChange} required />
                <input name="usuario" placeholder="Usuário" value={user.usuario} onChange={handleChange} required />
                <select name="tipo" value={user.tipo} onChange={handleChange}>
                    <option value="Aluno">Aluno</option>
                    <option value="Professor">Professor</option>
                    <option value="Administrador">Administrador</option>
                </select>
                <button type="submit">{user.id ? 'Atualizar' : 'Salvar'}</button>
            </form>
        </div>
    );
};

export default UserFormGrupo6;
