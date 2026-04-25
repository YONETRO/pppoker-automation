Feature: Flujo end to end de chip in y chip out en PPPoker Manager

  # ==================== CHIP IN ====================

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

  # ==================== CHIP OUT ====================

  Scenario Outline: Chip out exitoso desde la web
    Given el usuario se encuentra en la seccion de chip out
    When ingresa la cantidad de fichas "<cantidad>" a retirar
    And confirma la operacion
    Then la web muestra confirmacion "Chip out"

    Examples:
      | cantidad |
      | 10       |
      | 50       |
