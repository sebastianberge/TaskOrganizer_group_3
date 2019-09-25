<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<link href="css/style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="./js/GuiHandler.js" defer></script>
<script type="text/javascript" src="./js/TaskBox.js" defer></script>

<meta charset="ISO-8859-1">
<title>Task Organizer</title>
</head>
<body>
	<div id="message">
		<p>Waiting for server data.</p>
	</div>
	<div id="newtask">
		<button type="button">New task</button>
	</div>
	<div id="tasks"></div>

	<!-- UNDER CONSTRUCTION -->
	<!-- The Modal -->
	<div class="modal" id="taskbox">
		<!-- Modal content -->
		<div class="modal-content">
			<span class="close">&times;</span>
			<table>
				<tr>
					<th>Title:</th>
					<td><input id="taskInput" maxlength="80" size="25" type="text" /></td>
				</tr>
				<tr>
					<th>Status:</th>
					<td><select id="modalStatuses"></select></td>
				</tr>
			</table>
			<p>
				<button id="addTaskButton" type="submit">Add task</button>
			</p>
		</div>
	</div>
	<!-- UNDER CONSTRUCTION -->
</body>
</html>