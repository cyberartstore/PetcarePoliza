import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';


const data = [
  {id: 1, tipoPoliza: true, walletOwner: "Carlos"},
  {id: 2, tipoPoliza: true, walletOwner: "Daniela"},
  {id: 3, tipoPoliza: false, walletOwner: "Andres"},
  {id: 4, tipoPoliza: false, walletOwner: "Mario"},
  {id: 5, tipoPoliza: true, walletOwner: "karla"},
  {id: 6, tipoPoliza: false, walletOwner: "Enrique"},
];


//Data para conectar wallet
const CONTRACT_ADDRESS = "0x7FbcFdc22a28f756d060E5b1679E66C3028338F3";
const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "learning",
				"type": "string"
			}
		],
		"name": "addLearner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllLearners",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "learning",
						"type": "string"
					}
				],
				"internalType": "struct ChainJourney.Learner[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
;


class App extends React.Component {
  state = {
    data: data,
    form: {
      id: 0,
      tipoPoliza: false,
      walletOwner: ''
    },
    modalInsertar: false,
    modalEditar: false,
    modalEliminar: false
  };

  handleChange = (e: any) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }
  
  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }

  mostrarModalEditar = (registro: any) => {
    this.setState({ modalEditar: true, form: registro });
  }
  
  cerrarModalEditar = () => {
    this.setState({ modalEditar: false });
  }

  mostrarModalEliminar = (registro: any) => {
    this.setState({ modalEliminar: true, form: registro });
  }
  
  cerrarModalEliminar = () => {
    this.setState({ modalEliminar: false });
  }

  insertar = () => {
    var valorNuevo = {...this.state.form};
    valorNuevo.id = this.state.data.length + 1;
    var lista = [...this.state.data];
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsertar: false });
  }

  editar = (dato: any) => {
    var lista = [...this.state.data];
    lista.forEach((registro) => {
      if (dato.id === registro.id) {
        registro.tipoPoliza = dato.tipoPoliza;
        registro.walletOwner = dato.walletOwner;
      }
    });
    this.setState({ data: lista, modalEditar: false });
  }

  eliminar = (id: any) => {
    if (id) {
      var lista = [...this.state.data];
      lista = lista.filter((registro) => registro.id !== id);
      this.setState({ data: lista, modalEliminar: false });
    }
  }


  //Connect Wallet
  

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="warning" onclick="connectWallet()">Conectar monedero</Button> { " " }
          <Button color="success" onClick={this.mostrarModalInsertar}>Nueva póliza</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>TIPO POLIZA</th>
                <th>DUEÑO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr key={elemento.id}>
                  <td>{elemento.id}</td>
                  <td>{elemento.tipoPoliza ? 'Poliza 1' : 'Poliza 2'}</td>
                  <td>{elemento.walletOwner}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
                    <Button color="danger" onClick={() => this.mostrarModalEliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div className='container'>
              <h4 className='pr-12'>Insertar Registro</h4>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label><strong>ID</strong></label>
              <input type="text" name='id' className='form-control' readOnly value={this.state.data.length + 1} />
            </FormGroup>

            <br />

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="tipoPoliza" id="inlineRadio1" value={'1 avax'} onChange={this.handleChange} />
              <label className="form-check-label" htmlFor="inlineRadio1">1 Avax</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="tipoPoliza" id="inlineRadio2" value={'2 avax'} onChange={this.handleChange} />
              <label className="form-check-label" htmlFor="inlineRadio2">2 Avax</label>
            </div>

            <br />
            <br />

            <FormGroup>
              <label><strong>DUEÑO</strong></label>
              <input type="text" name='walletOwner' className='form-control' onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='success' onClick={this.insertar}>Insertar</Button>
            <Button color='danger' onClick={this.cerrarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            {/* Estás seguro de eliminar la póliza No {this.state.form && <strong>{this.state.form.id ? 'Poliza 1' : 'Poliza 2' }</strong>} */}
            Estás seguro de eliminar el ID {this.state.form && <strong>{this.state.form.id}</strong>}?
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-success' onClick={() => this.eliminar(this.state.form.id)}>Eliminar</button>
            <button className='btn btn-danger' onClick={this.cerrarModalEliminar}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label><strong>ID</strong></label>
              <input type="text" name='id' className='form-control' readOnly value={this.state.form.id} />
            </FormGroup>

            <br />
            
            <label><strong>TIPO POLIZA</strong></label>
            <br />
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="tipoPoliza" id="inlineRadio1" value={'1 avax'} checked={this.state.form.tipoPoliza} onChange={this.handleChange} />
              <label className="form-check-label" htmlFor="inlineRadio1">Poliza 1</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="tipoPoliza" id="inlineRadio2" value={'2 avax'} checked={!this.state.form.tipoPoliza} onChange={this.handleChange} />
              <label className="form-check-label" htmlFor="inlineRadio2">Poliza 2</label>
            </div>
            <br />
            <br />

            <FormGroup>
              <label><strong>DUEÑO</strong></label>
              <input type="text" name='walletOwner' className='form-control' onChange={this.handleChange} value={this.state.form.walletOwner} />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='success' onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color='danger' onClick={this.cerrarModalEditar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;