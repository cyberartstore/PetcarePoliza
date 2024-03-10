// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract PetcareM {
    
    struct poliza{
        uint256 id;
        uint TipoPoliza;
        bool Cobro;
        //tiempo de retorno de buen comportamiento
        uint256 Tiempo;
    }

    mapping (address => poliza[]) public infoPoliza;

    //funcion para emitir la poliza de seguro 
    function petCompra (uint256 _id,uint _Tipopoliza) payable external{
        require (msg.value == 1 ether*_Tipopoliza, "valor incorrecto");
        //tiempo en que se hizo la transaccion + tiempo futuro de buen comportamiento
        poliza memory nuevapoliza = poliza(_id,_Tipopoliza,false,block.timestamp+60); 
        infoPoliza[msg.sender].push()= nuevapoliza;
    }
    //funcion para procesar la reclamacion de la poliza y emitir un pago
    function petReclamacion (uint256 _id) external {
        require (infoPoliza[msg.sender][_id].Cobro == false);
        infoPoliza[msg.sender][_id].Cobro = true;
        //se le regresa la mitad del valor de la poliza
        payable(msg.sender).transfer((1 ether * infoPoliza[msg.sender][_id].TipoPoliza)/2);
    }
    function petBeneficio (uint256 _id) external {
        require (infoPoliza[msg.sender][_id].Cobro == false);
        //berifica que el tiempo de buen comportamiento se haya cumplido para entregar el valor
        require (block.timestamp >= infoPoliza[msg.sender][_id].Tiempo);
        infoPoliza[msg.sender][_id].Cobro = true;
        //se regresa el valor total de la poliza
        payable(msg.sender).transfer((1 ether * infoPoliza[msg.sender][_id].TipoPoliza));
    }
}