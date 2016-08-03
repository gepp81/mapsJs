<div id="divEditor" class="row">
    <h3>Listado de Items</h3>
    <span>
            <input name="nameSearch" type="text" ng-model="textSearchItem"/>
            <button class="btn btn-primary btn-xs" type="button" ng-click="getItems(currentPage)">
                &nbsp;Buscar&nbsp;</button>
            <button class="btn btn-info btn-xs" type="button" ng-click="open('lg', null)" disabled>
                &nbsp;Nuevo&nbsp;</button>
        </span>
    <!-- Table para Items -->
    <table class="table">
        <thead>
            <th>Nombre</th>
            <th>url</th>
            <th>Acciones</th>
        </thead>
        <tbody>
            <!--tr ng-repeat="item in dependenciesList | filter: {id:searchProcess}"-->
            <tr ng-repeat="item in items">
                <td>{{item.name}}</td>
                <td>{{item.url}}</td>
                <td>
                    <button ng-click="listSubItems(item)" class="btn btn-warning btn-xs">
                        <i class="fa fa-edit fa-lg"></i>
                    </button>
                    <button ng-click="remove(item)" class="btn btn-danger btn-xs" disabled>
                        <i class="fa fa-trash-o fa-lg"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="text-center">
        <pagination class="pagination-sm" total-items="totalResults" ng-model="currentPage" ng-change="pageChanged()" previous-text="Anterior" next-text="Siguiente"
          first-text="Primero" last-text="Último" items-per-page="20" num-pages="numPages"></pagination>
    </div>
</div>
