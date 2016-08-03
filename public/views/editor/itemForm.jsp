<div class="row" ng-show="itemToEdit">
    <div class="panel panel-default">
        <div class="panel-body">
            <form name="itemForm" class="itemForm">
                <div class="col-md-6">
                    <h4 ng-show="itemToEdit.item.id">Editar</h4>
                    <h4 ng-show="!itemToEdit.item.id">Crear</h4>
                </div>
                <div class="text-right col-md-6">
                    <button class="btn btn-danger" type="button" ng-click="cancelItem()">
                        <i class="fa fa-undo">&nbsp;Cancelar&nbsp;</i>
                    </button>
                    <button class="btn btn-primary" type="button" ng-click="saveItem()">
                        <i class="fa fa-floppy-o">&nbsp;Guardar&nbsp;</i>
                    </button>
                </div>
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon" id="addOnName">Nombre</span>
                        <input type="text" class="form-control" name="name" placeholder="Nombre (requerido)" ng-model="itemToEdit.item.name" aria-describedby="addOnName"
                          required ng-minlength="3">
                    </div>
                    <%-- <span ng-show="itemForm.name.$dirty && itemForm.name.$invalid">
                      <div class="alert alert-danger" role="alert">El usuario debe tener entre 5 y 25 letras.</div>
                    </span> --%>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-addon" id="addOnURL">Sitio Web</span>
                        <input type="text" class="form-control" name="url" placeholder="Sitio Web" ng-model="itemToEdit.item.url" aria-describedby="addOnURL">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-addon" id="addOnURLIcon">Ruta a imagen</span>
                        <input type="text" class="form-control" name="urlIcon" placeholder="Ruta a imagen" ng-model="itemToEdit.item.urlIcon" aria-describedby="addOnURLIcon">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon" id="addOnDescription">Descripci&oacute;n</span>
                        <textarea type="text" class="form-control" name="description" placeholder="Descripci&oacute;n (requerido)" ng-model="itemToEdit.item.description"
                          aria-describedby="addOnDescription" rows="3"></textarea>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
