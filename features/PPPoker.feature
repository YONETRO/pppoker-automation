Feature: Flujo end to end de chip in y chip out en PPPoker Manager

  @navegacion
  Scenario: Navegar a la seccion Chip In
    When hace click en el boton Chip In
    Then el modo activo es "Chip In"

  @navegacion
  Scenario: Navegar a la seccion Chip Out
    When hace click en el boton Chip Out
    Then el modo activo es "Chip Out"

  @pending
  Scenario: Chip in exitoso desde la web
    Given el usuario se encuentra en la seccion de chip in
    When ingresa la cantidad de fichas "100"
    And confirma el envio
    Then la web muestra confirmacion "Chip in"

  @pending
  Scenario: Chip out exitoso desde la web
    Given el usuario se encuentra en la seccion de chip out
    When ingresa la cantidad de fichas "100"
    And confirma la operacion
    Then la web muestra confirmacion "Chip out"
