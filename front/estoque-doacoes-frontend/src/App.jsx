import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', quantidade: '', categoria: '', data_entrada: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const res = await axios.get('http://localhost:3000/produtos');
    setProdutos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3000/produtos/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post('http://localhost:3000/produtos', form);
    }
    setForm({ nome: '', quantidade: '', categoria: '', data_entrada: '' });
    fetchProdutos();
  };

  const handleEdit = (produto) => {
    setForm(produto);
    setEditId(produto.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/produtos/${id}`);
    fetchProdutos();
  };

  return (
    <div>
      <h1>Controle de Estoque de Doações</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={form.quantidade}
          onChange={(e) => setForm({ ...form, quantidade: e.target.value })}
        />
        <input
          placeholder="Categoria"
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        />
        <input
          type="date"
          value={form.data_entrada}
          onChange={(e) => setForm({ ...form, data_entrada: e.target.value })}
        />
        <button type="submit">{editId ? 'Editar' : 'Adicionar'}</button>
      </form>

      <h2>Produtos</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - {produto.quantidade} - {produto.categoria} - {produto.data_entrada}
            <button onClick={() => handleEdit(produto)}>Editar</button>
            <button onClick={() => handleDelete(produto.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;