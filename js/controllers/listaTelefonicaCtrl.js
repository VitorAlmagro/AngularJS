angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosAPI, operadorasAPI, serialGenerator){
  $scope.app = "Lista Telefonica";

  $scope.contatos = [];
  $scope.operadoras = [];

  var carregarContatos = function(){
    contatosAPI.getContatos()
    .then(function(object){
      $scope.contatos = object.data;
    })
    .catch(function(data){
      $scope.error = "Não foi possivel carregar os dados";
    });
  };

  var carregarOperadoras = function(){
    operadorasAPI.getOperadoras()
    .then(function(object){
      $scope.operadoras = object.data;
    })
    .catch(function(data){
      $scope.error = "Não foi possivel carregar os dados";
    });
  };

  $scope.adicionarContato = function(contato){
    contato.serial = serialGenerator.generate();
    contato.data = new Date();

    contatosAPI.saveContato(contato)
    .then(function(object){
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      carregarContatos();
    });
  };

  $scope.apagarContatos = function(contatos){
    $scope.contatos = contatos.filter(function(contato){
        if (!contato.selecionado) return contato;
    });
  };

  $scope.isContatoSelecionado = function(contatos){
    return contatos.some(function(contato){
      return contato.selecionado;
    });
  };

  $scope.ordenarPor = function(campo){
    $scope.criterioDeOrdenacao = campo;
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
  };

  carregarContatos();
  carregarOperadoras();

});
