<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %></%@>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %></%@>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MDQ</title>
    <link href="<c:url value='/resources/css/bootstrap.min.css' />" rel="stylesheet"></link>
    <link href="<c:url value='/resources/css/font-awesome.min.css' />" rel="stylesheet"></link>
    <link href="<c:url value='/resources/css/indexEditor.css' />" rel="stylesheet"></link>
    <link href="<c:url value='/resources/css/tags.css' />" rel="stylesheet"></link>
    <link href="<c:url value='/resources/css/add-on.css' />" rel="stylesheet"></link>
    <link href="<c:url value='/resources/css/checkbox.css' />" rel="stylesheet"></link>
    <link rel="stylesheet" href="http://mbenford.github.io/ngTagsInput/css/ng-tags-input.min.css" />
    <link rel="stylesheet" href="http://mbenford.github.io/ngTagsInput/css/ng-tags-input.bootstrap.min.css">
</head>

<body ng-app="MDQMaps" ng-controller="EditorController">
    <div class="row editorContainer">
        <div class="col-md-6">
            <%@include file="list.jsp" %>
        </div>
        <div class="col-md-6">
            <%@include file="itemForm.jsp" %>
            <%@include file="map.jsp" %>
        </div>
    </div>

    <script src="<c:url value='/resources/js/libs/lodash.min.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/angular/angular.min.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/angular/angular-bootstrap.min.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/angular/ngStorage.min.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/angular/angular-simple-logger.min.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/angular/angular-google-maps.min.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/angular/angular-resource.min.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/angular/angular-ui-router.min.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/libs/ng-tags-input.js' />"></script>
    <script src="<c:url value='/resources/js/resources/resources.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/controllers/MapController.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/controllers/SettingsController.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/controllers/SubItemModalController.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/controllers/EditorController.js' />" type="text/javascript"></script>
    <script src="<c:url value='/resources/js/appEditor.js' />"></script>
</body>

</html>
