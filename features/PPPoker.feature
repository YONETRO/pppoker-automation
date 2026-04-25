Feature: Flujo end to end de chip in y chip out en PPPoker Manager

  # ==================== NAVEGACION ====================

  @navegacion
  Scenario: Navegar a la seccion Chip In
    When hace click en el boton Chip In
    Then la URL contiene "/chips"

  @navegacion
  Scenario: Navegar a la seccion Chip Out
    When hace click en el boton Chip Out
    Then la URL contiene "/chips"

  # ==================== CHIP IN ====================

  @chipIn
  Scenario Outline: Chip in - ingresar cantidad de fichas
    Given el usuario se encuentra en la seccion de chip in
    When ingresa la cantidad de fichas "<cantidad>"
    Then la pagina sigue en "/chips"

    Examples:
      | cantidad |
      | 10       |
      | 50       |
      | 100      |

  # ==================== CHIP OUT ====================

  @chipOut
  Scenario Outline: Chip out - ingresar cantidad de fichas
    Given el usuario se encuentra en la seccion de chip out
    When ingresa la cantidad de fichas "<cantidad>" a retirar
    Then la pagina sigue en "/chips"

    Examples:
      | cantidad |
      | 10       |
      | 50       |

  # ==================== PENDIENTE (habilitar cuando haya fichas) ====================

  @pending
  Scenario Outline: Chip in exitoso desde la web
    Given el usuario se encuentra en la seccion de chip in
    When ingresa la cantidad de fichas "<cantidad>"
    And confirma el envio
    Then la web muestra confirmacion "Chip in"

    Examples:
      | cantidad |
      | 10       |
      | 50       |
      | 100      |

  @pending
  Scenario Outline: Chip out exitoso desde la web
    Given el usuario se encuentra en la seccion de chip out
    When ingresa la cantidad de fichas "<cantidad>" a retirar
    And confirma la operacion
    Then la web muestra confirmacion "Chip out"

    Examples:
      | cantidad |
      | 10       |
      | 50       |
