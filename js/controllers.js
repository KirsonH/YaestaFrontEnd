    /**
     * INSPINIA - Responsive Admin Theme
     *
     * Main controller.js file
     * Define controllers with data used in Inspinia theme
     *
     *
     *
     *
     */

    /**
     * MainCtrl - controller
     * Contains severals global data used in diferent view
     *
     */
    function MainCtrl($scope,restServices,$modal, $timeout, $q, SweetAlert) {

        $scope.order = "";
        $scope.orderId = "";
        /**
         * daterange - Used as initial model for data range picker in Advanced form view
         */
        this.daterange = {startDate: null, endDate: null}

        /**
         * slideInterval - Interval for bootstrap Carousel, in milliseconds:
         */
        this.slideInterval = 5000;

        this.parameters = restServices('parameter/getAll/').query(function(data){  
            return data;
        });

        //this.parameters.$promise.then(function(data) {
            //  console.log(data);
        //});

        this.catalogs = restServices('catalog/getMainCatalogs').query(function(data){  
           return data;
        });

        

        this.suppliers = restServices('supplier/getAll/').query(function(data){  
           return data;
        });

        $scope.getArraySuppliers = restServices('supplier/getAllVO/').query(function(data){  
           return data;
        });

        
        this.categories = restServices('category/getAll').query(function(data){  
           return data;
        });

          


        this.brands = restServices('brand/getAll').query(function(data){  
           return data;
        });

        this.clients = restServices('client/getAllVO').query(function(data){  
           return data;
        });

        $scope.getCustomerArray=this.clients;

        this.sequences = restServices('sequence/getAll').query(function(data){  
           return data;
        });      

        
        $scope.orderSchema = restServices('vitextIntegration/getOrdersRest').get(function(data){  
           $scope.$broadcast('scroll.refreshComplete');
           return data;
        });

        $scope.orderItemList = restServices('order/getAllItemsVO').query(function(data){  
           return data;
        });
         
        $scope.getArray=$scope.orderItemList;

        $scope.newClientList = restServices('client/getNewClient').query(function(data){  
           return data;
        });
         
        $scope.getClientArray=$scope.newClientList
       
        var urlServiceCatalogOrderStatusIntegration = 'catalog/getSubCatalogs'+'ORDER_STATUS_INTEGRATION';

        this.orderStatusIntegrationList = restServices(urlServiceCatalogOrderStatusIntegration ).query(function(data){  
           console.log(data);
           return data;
        }); 
        
        var urlServiceCatalogOrderStatusVtex = 'catalog/getSubCatalogs'+'ORDER_STATUS_VTEX';

        this.orderStatusVtexList = restServices(urlServiceCatalogOrderStatusVtex).query(function(data){  
           console.log(data);
           return data;
        });    

        $scope.categoryList = restServices('catalog/getSubCatalogsCATEGORY_CATALOG').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.bankList = restServices('catalog/getSubCatalogsBANK_CATALOG').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });    

        $scope.accountTypeList = restServices('catalog/getSubCatalogsACCOUNT_TYPE').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });    
        
        $scope.openOrders = function (size,order) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/orders/views/orderDetail.html',
                size: size,
                controller: ModalOrderInstanceCtrl,
                resolve: {
                    order: function () {
                        return order;
                    }
                }
            });
        };

        $scope.openCancelOrders = function (size,order) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/orders/views/orderCancelDetail.html',
                size: size,
                controller: ModalOrderInstanceCtrl,
                resolve: {
                    order: function () {
                        return order;
                    }
                }
            });
        };
    	
        $scope.openInvoices = function (size,order) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/orders/views/invoiceDetail.html',
                size: size,
                controller: ModalInvoiceInstanceCtrl,
                resolve: {
                    order: function () {
                        return order;
                    }
                }
            });
        };

        $scope.openCreditNote = function (size,order) {
            console.log("Ingresa");
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/orders/views/creditNote.html',
                size: size,
                controller: ModalCreditNoteInstanceCtrl,
                resolve: {
                    order: function () {
                        return order;
                    }
                }
            });
        };
        
        $scope.openTracking = function (size,order) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/orders/views/invoice.html',
                size: size,
                controller: ModalInstanceCtrl,
                resolve: {
                    order: function () {
                        return order;
                    }
                }
            });
        };

        $scope.openSupplier = function (size,supplier) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/products/views/seller-edit.html',
                size: size,
                controller: sellerUpdateCtrl,
                resolve: {
                    supplier: function () {
                        return supplier;
                    }
                }
            });
        };

        $scope.openSequence = function (size,seq) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/catalog/views/sequence-edit.html',
                size: size,
                controller: sequenceUpdateCtrl,
                resolve: {
                    seq: function () {
                        return seq;
                    }
                }
            });
        };

        $scope.searchOrder = function(){
            console.log($scope.orderId);
            var vurl='vitextIntegration/getOrderComplete'+$scope.orderId;
            $timeout(function() {
                $scope.order = "";
                $scope.order = restServices(vurl).get(function(data){  
                    return data;
                }); 
               
                $scope.$apply();
            }, 1000);    
        };

        $scope.refresh = function(){
            
            $scope.orderSchema = {};
        
            $timeout(function() {
                $scope.orderSchema = {};
                $scope.orderSchema = restServices('vitextIntegration/getOrdersRest').get(function(data){  
                    return data;
                }); 
               
                $scope.$apply();
            }, 1000);
            
        
        };

         $scope.refreshItems = function(){
            

            SweetAlert.swal("Info", "Por favor espere la confirmacion de culminacion del proceso :)", "info");

            $scope.orderItemList = [];
            $scope.getArray = [];
            $scope.processOrderItems = "";

            var vpromises = [];

             $timeout(function() {
                $scope.processOrderItems = "";
                $scope.processOrderItems = restServices('vitextIntegration/loadOrderItems').get(function(data){  
                    return data;
                });    
               
                $scope.$apply();
            }, 1000);

            
            $timeout(function() {
                $scope.orderItemList = [];
                $scope.orderItemList = restServices('order/getAllItemsVO').query(function(data){  
                    return data;
                });    
               
                $scope.$apply();
            }, 1000);

            $scope.getArray=$scope.orderItemList;
           
            //vpromises.push($scope.processOrderItems);
            vpromises.push($scope.orderItemList);
            vpromises.push($scope.getArray);

            $q.all(vpromises).then(function (results) { 
               SweetAlert.swal("Info", "La informacion ha sido actualizada :)", "info");
            });

        };

        $scope.reloadItems = function(){

            $timeout(function() {
                $scope.processOrderItems = "";
                $scope.processOrderItems = restServices('vitextIntegration/loadOrderItems').get(function(data){  
                    return data;
                });    
               
                $scope.$apply();
            }, 1000);

        };
         
         $scope.reloadClients = function(){

            $timeout(function() {
                $scope.processClients = "";
                $scope.processClients = restServices('client/updateInfo').get(function(data){  
                    return data;
                });    
               
                $scope.$apply();
            }, 1000);

        };
        

        $scope.exportAction = function(action){ 
            $scope.export_action=action;
            console.log("action");
            console.log( $scope.export_action);
            switch($scope.export_action){ 
                case 'pdf': $scope.$broadcast('export-pdf', {}); 
                      break; 
                case 'excel': $scope.$broadcast('export-excel', {fileName:'ordenes.xls'}); 
                      break; 
                case 'doc': $scope.$broadcast('export-doc', {});
                      break; 
                case 'csv': $scope.$broadcast('export-csv', {});
                      break; 
                default: console.log('no event caught'); 
            }
        };
       
    };



       


    function ModalInstanceCtrl ($scope, $modalInstance) {

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };



    };


   function ModalOrderInstanceCtrl ($scope, $modalInstance, order, restServices, SweetAlert,DTOptionsBuilder, DTColumnDefBuilder) {
        $scope.motiveCancel="";
        $scope.order=order;
        $scope.deliveryList=[];
        $scope.deliverySelected={};
        $scope.showApprovedCancel=true;
        $scope.customerAditionalInfo="";
        $scope.dtInstance1 = {};
        $scope.dtInstance2 = {};
        $scope.dtOptions = DTOptionsBuilder.newOptions();
        $scope.dtColumnDefs1 = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4)
        ];
        $scope.dtColumnDefs2 = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3)
        ];

        console.log("order");
        console.log($scope.order);

        var urlService = 'vitextIntegration/getOrderComplete'+$scope.order.orderId;

        $scope.orderComplete =  restServices(urlService).get(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });

        console.log("orderComplete");
        console.log($scope.orderComplete);

        $scope.deliveryList = restServices('catalog/getSubCatalogsDELIVERY_PROVIDER').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });

        console.log("deliveryList");
        console.log($scope.deliveryList);

        $scope.motiveCancelList = restServices('catalog/getSubCatalogsORDER_CANCEL_MOTIVE').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });

        console.log("motiveCancelList");
        console.log($scope.motiveCancelList);

        $scope.onSelectedMotiveCancel = function (selectedMotiveCancel) {
            console.log("selectedMotiveCancel");
            console.log(selectedMotiveCancel);
            $scope.motiveCancel = angular.copy(selectedMotiveCancel);
            $scope.orderComplete.motiveCancelId = $scope.motiveCancel.id;
        };

        if($scope.orderComplete.status!="canceled" && $scope.orderComplete.status!="invoiced"){
            $scope.showApprovedCancel=true;
        }else{
            $scope.showApprovedCancel=false;
        }

        if($scope.orderComplete.appStatus=="approved"){
            $scope.showGeneratedGuide=true;
            $scope.showApprovedCancel=false;
        }else{
            $scope.showGeneratedGuide=false;
        }


        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.aproveOrder = function (vorderComplete) {
            //$modalInstance.close();

            urlService = 'vitextIntegration/changeStatus';

            console.log("===++===");
            console.log(vorderComplete);
            vorderComplete.appStatus = "approved";

            $scope.orderCompleteUpd =  restServices(urlService).save({order:vorderComplete,action:"approved"},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.orderCompleteUpd );

              SweetAlert.swal("Info", "La orden ha sido actualizada :)", "info");
              $scope.showGeneratedGuide=true;
              $scope.showApprovedCancel=false;
        };

        $scope.cancelOrder = function (vorderComplete) {
            //$modalInstance.close();

            urlService = 'vitextIntegration/cancelOrder';

            console.log("===++===");
            console.log(vorderComplete);
            vorderComplete.appStatus = "cancel";

            $scope.orderCompleteUpd =  restServices(urlService).save({order:vorderComplete,action:"cancel"},function(data){  
                return data;
            });

            SweetAlert.swal("Info", "La orden ha sido cancelada :)", "info");
        };

        $scope.onSelectedDelivery = function (selectedSupplier,selectedDelivery,idx) {
            console.log("selectedSupplier");
            console.log(selectedSupplier);
            console.log("selectedDelivery");
            console.log(selectedDelivery);
            $scope.deliverySelected = angular.copy(selectedDelivery);
            $scope.supplierDeliveryInfoList = angular.copy($scope.orderComplete.supplierDeliveryInfoList);
            $scope.supplierDeliveryInfoList.splice(idx, 1);
            selectedSupplier.delivery = selectedDelivery;
            $scope.supplierDeliveryInfoList.push(selectedSupplier);
            $scope.orderComplete.supplierDeliveryInfoList = $scope.supplierDeliveryInfoList;
            console.log("ojo");
            console.log($scope.orderComplete);
        };
        

        $scope.generateGuide = function(vorderComplete){
            
            urlService = 'vitextIntegration/generateGuide';

            $scope.guideInfoBean =  restServices(urlService).save({orderComplete:vorderComplete,supplierDeliveryInfoList:vorderComplete.supplierDeliveryInfoList,customerAdditionalInfo:$scope.customerAditionalInfo},function(data){  
                return data;
            });

            
            var vmensaje = "La guias han sido generadas :)";
            console.log("Respuesta de generar guias")
            console.log($scope.guideInfoBean);
            console.log($scope.guideInfoBean.$promise);

            SweetAlert.swal("Info", "La guia ha sido generada :)", "info");
            /*
            if($scope.guideInfoBean.error=="OK"){
              SweetAlert.swal("Info", "La guia ha sido generada :)", "info");
            }else{
                SweetAlert.swal("Error", "Problema al generar guias orden:)", "error");
            }*/

        }

    };


    function ModalInvoiceInstanceCtrl ($scope, $modalInstance, order, restServices, SweetAlert) {

        $scope.order=order;
        $scope.showInvoice=true;
        $scope.showCreditNote=true;
        $scope.motive="";
        $scope.invoiceNumber="";
        $scope.invoiceDate="";

        console.log("order");
        console.log($scope.order);

        var urlService = 'vitextIntegration/getOrderComplete'+$scope.order.orderId;

        $scope.orderComplete =  restServices(urlService).get(function(data){  
           return data;
        });

        
        console.log("orderComplete");
        console.log($scope.orderComplete);

        if($scope.orderComplete.status!="canceled" && $scope.orderComplete.status!="invoiced"){
            $scope.showApprovedCancel=true;
        }else{
            $scope.showApprovedCancel=false;
        }

        if($scope.orderComplete.appStatus=="approved"){
            $scope.showGeneratedGuide=true;
            $scope.showApprovedCancel=false;
        }else{
            $scope.showGeneratedGuide=false;
        }


        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.invoiceOrder = function (vorderComplete) {
            //$modalInstance.close();

            urlService = 'vitextIntegration/invoiceOrder';

            console.log("===++===");
            console.log(vorderComplete);
            vorderComplete.appStatus = "approved";

            $scope.invoice =  restServices(urlService).save({order:vorderComplete,action:"invoice"},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.invoice);

            /*
            urlService = 'vitextIntegration/invoiceOrderVtex';

            $scope.invoiceVtex =  restServices(urlService).save({order:vorderComplete,action:"invoice"},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.invoiceVtex);
            */
            
            SweetAlert.swal("Info", "La orden ha sido facturada:)", "info");
            $scope.showGeneratedGuide=true;
            $scope.showApprovedCancel=false;
            
        };

        $scope.creditNoteOrder = function (vorderComplete) {
            //$modalInstance.close();

            urlService = 'vitextIntegration/creditNoteOrder';

            console.log("===++===");
            console.log(vorderComplete);
            vorderComplete.appStatus = "approved";

            $scope.creditNote =  restServices(urlService).save({orderComplete:vorderComplete,motive:$scope.motive,invoiceNumber:$scope.invoiceNumber,invoiceDate:$scope.invoiceDate},function(data){  
                return data;
            });

            console.log("===*CN*===");
            console.log($scope.creditNote);

            
            SweetAlert.swal("Info", "La nota de credito para la orden ha sido generada:)", "info");
            
        };


        

    };

    function ModalCreditNoteInstanceCtrl ($scope, $modalInstance, order, restServices, SweetAlert) {

        $scope.order=order;
        $scope.showCreditNote=true;
        

        console.log("order");
        console.log($scope.order);

        var urlService = 'vitextIntegration/getOrderComplete'+$scope.order.orderId;

        $scope.orderComplete =  restServices(urlService).get(function(data){  
           return data;
        });

        
        console.log("orderComplete");
        console.log($scope.orderComplete);

        
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.creditNoteOrder = function (vorderComplete) {
            //$modalInstance.close();

            urlService = 'vitextIntegration/creditNoteOrder';

            console.log("===++===");
            console.log(vorderComplete);
            vorderComplete.appStatus = "approved";

            $scope.invoice =  restServices(urlService).save({order:vorderComplete,action:"invoice"},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.invoice);

            
            SweetAlert.swal("Info", "La orden ha sido facturada:)", "info");
            $scope.showGeneratedGuide=true;
            $scope.showApprovedCancel=false;
            
        };

        

    };



    /**
     * CalendarCtrl - Controller for Calendar
     * Store data events for calendar
     */
    function CalendarCtrl($scope) {

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        // Events
        $scope.events = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];


        /* message on eventClick */
        $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
            $scope.alertMessage = (event.title + ': Clicked ');
        };
        /* message on Drop */
        $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = (event.title +': Droped to make dayDelta ' + dayDelta);
        };
        /* message on Resize */
        $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = (event.title +': Resized to make dayDelta ' + minuteDelta);
        };

        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

        /* Event sources array */
        $scope.eventSources = [$scope.events];
    };



    

    /**
     * translateCtrl - Controller for translate
     */
    function translateCtrl($translate, $scope) {
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
    };
 

  function loginCtrl($scope,Base64,UserService,$rootScope,$http,restServices,$window,ngDialog,$location,SweetAlert){
    //console.log("es login");

        $rootScope.loggedUser = {

        };
        
        $scope.adminUser = restServices('activiBpm/getAdminUser/').get(function(data){  
           return data;
        });

        console.log($scope.adminUser);
        //$scope.username = $scope.user.username;
        //$scope.password = $scope.user.password;
        $rootScope.loggedin = false;

        $scope.login = function () {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ":" + $scope.password);

            UserService.get({user: $scope.username}, function (data) {
            // data = JSON.parse(data);

            console.log("====>>> USER data");
            console.log(data);

            $rootScope.loggedin = true;
            $rootScope.loggedUser = data;
            $rootScope.username = $scope.username;
            $rootScope.password = $scope.password;

            $location.path('/modules/orders');
            
            },
            function(error) {
            // error handler
                console.log("Error de autenticacion");
                 
                 //$window.alert("Error de autenticacion");
                /* ngDialog.open({
                    template: '<p>Error de autenticacion</p>',
                    plain: true,
                    className: 'ngdialog-theme-default' 
                });
                */
                SweetAlert.swal("Error", "Usuario o clave incorrecta :)", "error");
            });
        
      };

     
  };

  function orderItemCtrl($scope,$rootScope,$http,restServices, SweetAlert){
        $scope.startDate = "";
        $scope.finishDate = "";

        $scope.dateOptions = {
            dateFormat: "dd-mm-yyyy"
        };
       
        $scope.orderItemList = restServices('order/getAllItemsVO').query(function(data){  
           return data;
        });
         
        $scope.getArray=$scope.orderItemList;  

        $scope.searchNewItems = function(vStart,vFinish){
          
            console.log("startDate");console.log($scope.startDate);  
            console.log("finishDate");console.log($scope.finishDate);  
             console.log("startDate");console.log(vStart);  
            console.log("finishDate");console.log(vFinish);  
            var vurl = 'order/getItemsByRangeDateVO/'+$scope.startDate+'/'+$scope.finishDate;
            console.log("vurl");console.log(vurl);
            $scope.orderItemList = restServices(vurl).query(function(data){  
                return data;
            });
         
            $scope.getArray=$scope.orderItemList;   
        };  
      
  };

  function warehouseItemCtrl($scope,$rootScope,$http,restServices, SweetAlert){
        $scope.startDate = "";
        $scope.finishDate = "";

        $scope.dateOptions = {
            dateFormat: "dd-mm-yyyy"
        };
       
        $scope.warehouseItemList = restServices('order/getAllWarehouseVO').query(function(data){  
           return data;
        });
         
        $scope.getArrayWarehouse=$scope.warehouseItemList;  

        $scope.searchNewWarehouseItems = function(vStart,vFinish){
          
            console.log("startDate");console.log($scope.startDate);  
            console.log("finishDate");console.log($scope.finishDate);  
            console.log("startDate");console.log(vStart);  
            console.log("finishDate");console.log(vFinish);  
            var vurl = 'order/getItemsWarehouseByRangeDateVO/'+$scope.startDate+'/'+$scope.finishDate;
            console.log("vurl");console.log(vurl);
            $scope.warehouseItemList = restServices(vurl).query(function(data){  
                return data;
            });
         
            $scope.getArrayWarehouse=$scope.warehouseItemList;   
        };  
      
  };

  function guideCtrl($scope,$rootScope,$http,restServices, SweetAlert){
        $scope.startDate = "";
        $scope.finishDate = "";

        $scope.dateOptions = {
            dateFormat: "dd-mm-yyyy"
        };
       
        $scope.guideList = restServices('guide/getAllVO').query(function(data){  
           return data;
        });
         
        $scope.getGuideArray=$scope.guideList;  

        $scope.searchGuides = function(vStart,vFinish){
          
            console.log("startDate");console.log($scope.startDate);  
            console.log("finishDate");console.log($scope.finishDate);  
             console.log("startDate");console.log(vStart);  
            console.log("finishDate");console.log(vFinish);  
            var vurl = 'guide/getGuidesByRangeDateVO/'+$scope.startDate+'/'+$scope.finishDate;
            console.log("vurl");console.log(vurl);
            $scope.guideList = restServices(vurl).query(function(data){  
                return data;
            });
         
            $scope.getGuideArray=$scope.guideList;   
        };  
      
  };

  function sellerCreateCtrl($scope,$rootScope,$http,restServices, SweetAlert){

         $scope.categoryList = restServices('catalog/getSubCatalogsCATEGORY_CATALOG').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.bankList = restServices('catalog/getSubCatalogsBANK_CATALOG').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });    

        $scope.accountTypeList = restServices('catalog/getSubCatalogsACCOUNT_TYPE').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });    

        $scope.supplierStatusList = restServices('catalog/getSubCatalogsSUPPLIER_STATUS').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.productListStatusList = restServices('catalog/getSubCatalogsPRODUCT_LIST_STATUS').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });

        $scope.priorityListStatus = restServices('catalog/getSubCatalogsPRIORITY').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });

        $scope.seller = {};
        $scope.seller.name              = "";
        $scope.seller.contactEmail      = "";
        $scope.seller.contactName       = "";
        $scope.seller.contactLastName   = "";
        $scope.seller.address           = "";
        $scope.seller.postalCode        = "";
        $scope.seller.ruc               = "";
        $scope.seller.phone             = "";
        $scope.seller.bank              = null;
        $scope.seller.category          = null;
        $scope.seller.accountType       = null;
        $scope.seller.accountNumber     = "";
        $scope.seller.accountName       = "";
        $scope.seller.accountEmail      = "";
        $scope.seller.isNew             = true;
        $scope.seller.supplierStatus    = null;
        $scope.seller.productListStatus = null;
        $scope.seller.isWarehouse       = false;
        $scope.seller.priority          = null;
        
        $scope.bank                 = "";
        $scope.category             = "";
        $scope.accountType          = "";
        $scope.supplierStatus       = "";
        $scope.productListStatus    = "";
        

        $scope.contactSelected  = {};
        $scope.sellerContacts = [];
        
        $scope.newContact  = {
            id: -1,
            name: "",
            phone: "",
            email: ""
        };

        $scope.removeContactList = [];

        $scope.showAddContact = false;

        $scope.getTemplate = function (contact) {
            if (contact.id === $scope.contactSelected.id) return 'edit';
            else return 'display';
        };

        $scope.editContact = function (contact) {
            $scope.contactSelected = angular.copy(contact);
        };

        $scope.saveContact = function (idx) {
            console.log("Saving contact");
            $scope.sellerContacts[idx] = angular.copy($scope.contactSelected);
            $scope.reset();
        };

        $scope.reset = function () {
            $scope.contactSelected = {};
            $scope.newContact  = {
                id: -1,
                name: "",
                phone: "",
                email: ""
            };
        };

        $scope.addContact = function () {
            $scope.showAddContact = true;
        };

        $scope.addNewContact = function () {
            $scope.sellerContacts.push($scope.newContact);
            $scope.showAddContact = false;
            $scope.reset();
            $scope.getTemplate($scope.newContact);
        };


        $scope.cancelNewContact = function () {
            $scope.showAddContact = false;
            $scope.reset();
            $scope.getTemplate($scope.newContact);
        };

        $scope.removeContact = function (idx) {
            console.log("Ingresa a remover");
            console.log(idx);
            $scope.contactSelected = angular.copy($scope.sellerContacts[idx]);
            $scope.sellerContacts.splice(idx, 1);
            $scope.removeContactList.push($scope.contactSelected);
            $scope.showAddContact = false;
           
            $timeout(function() {
                $scope.reset();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            }, 1000);

            
            $scope.getTemplate($scope.newContact);
        };

        $scope.onSelectedCategory = function (selectedCategory) {
            console.log("selectedCategory");
            console.log(selectedCategory);
            $scope.category = angular.copy(selectedCategory);
            $scope.seller.category = selectedCategory;
        };

        $scope.onSelectedBank = function (selectedBank) {
            console.log("selectedBank");
            console.log(selectedBank);
            $scope.bank = angular.copy(selectedBank);
            $scope.seller.bank = selectedBank;
        };

        $scope.onSelectedAccountType = function (selectedAccountType) {
            console.log("selectedAccountType");
            console.log(selectedAccountType);
            $scope.accountType = angular.copy(selectedAccountType);
            $scope.seller.accountType = selectedAccountType;
        };

        $scope.onSelectedSupplierStatus = function (selectedSupplierStatus) {
            console.log("selectedSupplierStatus");
            console.log(selectedSupplierStatus);
            $scope.supplierStatus = angular.copy(selectedSupplierStatus);
            $scope.seller.supplierStatus = selectedSupplierStatus;
        };

        $scope.onSelectedProductListStatus = function (selectedProductListStatus) {
            console.log("selectedProductListStatus");
            console.log(selectedProductListStatus);
            $scope.supplierStatus = angular.copy(selectedProductListStatus);
            $scope.seller.productListStatus = selectedProductListStatus;
        };

        $scope.onSelectedPriorityListStatus = function (selectedPriority) {
            console.log("selectedPriority");
            console.log(selectedPriority);
            $scope.priority = angular.copy(selectedPriority);
            $scope.seller.priority = selectedPriority;
        };


         var urlService = 'supplier/create';

        $scope.saveSeller = function () {
           $scope.supplier =  restServices(urlService).save({supplier:$scope.seller,contactList:$scope.sellerContacts},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.supplier);

            
            SweetAlert.swal("Info", "El proveedor ha sido guardado)", "info");
        };
  };


  function sellerUpdateCtrl($scope,$rootScope,$http,restServices,supplier,$modalInstance, SweetAlert,$timeout){


        $scope.categoryList = restServices('catalog/getSubCatalogsCATEGORY_CATALOG').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.bankList = restServices('catalog/getSubCatalogsBANK_CATALOG').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });    

        $scope.accountTypeList = restServices('catalog/getSubCatalogsACCOUNT_TYPE').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });    

        $scope.supplierStatusList = restServices('catalog/getSubCatalogsSUPPLIER_STATUS').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });  

        $scope.productListStatusList = restServices('catalog/getSubCatalogsPRODUCT_LIST_STATUS').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        }); 

        $scope.priorityListStatus = restServices('catalog/getSubCatalogsPRIORITY').query(function(data){  
            $scope.$broadcast('scroll2.refreshComplete');
           return data;
        });   

        $scope.contactSelected  = {};
        $scope.sellerContacts = [];


        
        $scope.newContact  = {
            id: -1,
            name: "",
            phone: "",
            email: ""
        };

        $scope.removeContactList = [];

        $scope.showAddContact = false;

        $scope.seller               = supplier;
        $scope.seller.isNew         = false;
        $scope.bank                 = supplier.bank;
        $scope.category             = supplier.category;
        $scope.accountType          = supplier.accountType;
        $scope.supplierStatus       = supplier.supplierStatus;
        $scope.productListStatus    = supplier.productListStatus;
        $scope.priority             = supplier.priority;
        $scope.seller.isWarehouse   = supplier.isWarehouse;
        

        var urlService = 'supplier/getContacts'+$scope.seller.id;

        $scope.sellerContacts = restServices(urlService).query(function(data){  
           return data;
        });

        console.log($scope.sellerContacts);

        // gets the template to ng-include for a table row / item
        $scope.getTemplate = function (contact) {
            if (contact.id === $scope.contactSelected.id) return 'edit';
            else return 'display';
        };

        $scope.editContact = function (contact) {
            $scope.contactSelected = angular.copy(contact);
        };

        $scope.saveContact = function (idx) {
            console.log("Saving contact");
            $scope.sellerContacts[idx] = angular.copy($scope.contactSelected);
            $scope.reset();
        };

        $scope.reset = function () {
            $scope.contactSelected = {};
            $scope.newContact  = {
                id: -1,
                name: "",
                phone: "",
                email: ""
            };
        };

        $scope.addContact = function () {
            $scope.showAddContact = true;
        };

        $scope.addNewContact = function () {
            $scope.sellerContacts.push($scope.newContact);
            $scope.showAddContact = false;
            $scope.reset();
            $scope.getTemplate($scope.newContact);
        };


        $scope.cancelNewContact = function () {
            $scope.showAddContact = false;
            $scope.reset();
            $scope.getTemplate($scope.newContact);
        };

        $scope.removeContact = function (idx) {
            console.log("Ingresa a remover");
            console.log(idx);
            $scope.contactSelected = angular.copy($scope.sellerContacts[idx]);
            $scope.sellerContacts.splice(idx, 1);
            $scope.removeContactList.push($scope.contactSelected);
            $scope.showAddContact = false;

            $timeout(function() {
                 urlService = 'supplier/removeContact';
                $scope.resp =  restServices(urlService).save({contact:$scope.contactSelected},function(data){  
                    return data;
                });
                console.log($scope.resp);
                $scope.reset();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            }, 1000);

            
            $scope.getTemplate($scope.newContact);
        };

        $scope.onSelectedCategory = function (selectedCategory) {
            console.log("selectedCategory");
            console.log(selectedCategory);
            $scope.category = angular.copy(selectedCategory);
            $scope.seller.category = selectedCategory;
        };

        $scope.onSelectedBank = function (selectedBank) {
            console.log("selectedBank");
            console.log(selectedBank);
            $scope.bank = angular.copy(selectedBank);
            $scope.seller.bank = selectedBank;
        };

        $scope.onSelectedAccountType = function (selectedAccountType) {
            console.log("selectedAccountType");
            console.log(selectedAccountType);
            $scope.accountType = angular.copy(selectedAccountType);
            $scope.seller.accountType = selectedAccountType;
        };

        $scope.onSelectedSupplierStatus = function (selectedSupplierStatus) {
            console.log("selectedSupplierStatus");
            console.log(selectedSupplierStatus);
            $scope.supplierStatus = angular.copy(selectedSupplierStatus);
            $scope.seller.supplierStatus = selectedSupplierStatus;
        };

        $scope.onSelectedProductListStatus = function (selectedProductListStatus) {
            console.log("selectedProductListStatus");
            console.log(selectedProductListStatus);
            $scope.supplierStatus = angular.copy(selectedProductListStatus);
            $scope.seller.productListStatus = selectedProductListStatus;
        };

        $scope.onSelectedPriorityListStatus = function (selectedPriority) {
            console.log("selectedPriority");
            console.log(selectedPriority);
            $scope.priority = angular.copy(selectedPriority);
            $scope.seller.priority = selectedPriority;
        };

        
        $scope.updateSeller = function (vsupplier) {
           urlService = 'supplier/update';
           $scope.supplier =  restServices(urlService).save({supplier:vsupplier,contactList:$scope.sellerContacts,removeContactList:$scope.removeContactList},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.supplier);

            
            SweetAlert.swal("Info", "El proveedor ha sido guardado)", "info");
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
  };


///
function sequenceCreateCtrl($scope,$rootScope,$http,restServices, SweetAlert){

        $scope.seq = {};
        $scope.seq.seqName = "";
        $scope.seq.seqNextValue = 1;
        $scope.seq.increment = 1;
       

         var urlService = 'sequence/save';

        $scope.saveSequence = function () {
           $scope.supplier =  restServices(urlService).save({tableSequence:$scope.seq},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.seq);

            
            SweetAlert.swal("Info", "El registro ha sido guardado)", "info");
        };
  };


  function sequenceUpdateCtrl($scope,$rootScope,$http,restServices,seq,$modalInstance, SweetAlert){

        $scope.seq = seq;

        var urlService = 'sequence/save';
        
        $scope.updateSequence = function (vSequence) {
           $scope.supplier =  restServices(urlService).save({tableSequence:vSequence},function(data){  
                return data;
            });

            console.log("===**===");
            console.log($scope.seq);

            
            SweetAlert.swal("Info", "El registro ha sido actualizado)", "info");
        };

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
  };

       


    /**
     *
     * Pass all functions into module
     */
    angular
        .module('inspinia')
        .controller('MainCtrl', MainCtrl)
        .controller('ModalOrderInstanceCtrl', ModalOrderInstanceCtrl)
        .controller('ModalInvoiceInstanceCtrl', ModalInvoiceInstanceCtrl)
        .controller('ModalCreditNoteInstanceCtrl', ModalCreditNoteInstanceCtrl)
        .controller('sellerCreateCtrl', sellerCreateCtrl)
        .controller('sellerUpdateCtrl', sellerUpdateCtrl)
        .controller('sequenceCreateCtrl', sequenceCreateCtrl)
        .controller('orderItemCtrl', orderItemCtrl)
        .controller('guideCtrl', guideCtrl)
        .controller('warehouseItemCtrl',warehouseItemCtrl)
        .controller('CalendarCtrl', CalendarCtrl)
    	.controller('translateCtrl', translateCtrl)
        .controller('loginCtrl', loginCtrl);

