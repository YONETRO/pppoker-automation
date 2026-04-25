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

  # ==================== CHIP IN / CARGA ====================

  @pending
  Scenario Outline: Chip in exitoso desde la web
    Given el usuario se encuentra en la seccion de chip in
    When ingresa el ID de usuario "<id_usuario>"
    And ingresa la cantidad de fichas "<cantidad>"
    And confirma el envio
    Then la web muestra el estado "Procesando"
    And la web muestra confirmacion "Chip in completado exitosamente"
    And el saldo del usuario en la web se actualiza con "<cantidad>" fichas

    Examples:
      | id_usuario | cantidad |
      | 13495400   | 100      |
      | 13495400   | 500      |
      | 13495400   | 1000     |

  @pending
  Scenario: Chip in fallido por ID de usuario inexistente
    Given el usuario se encuentra en la seccion de chip in
    When ingresa el ID de usuario "99999999"
    And ingresa la cantidad de fichas "100"
    And confirma el envio
    Then la web muestra mensaje de error "Usuario no encontrado"

  @pending
  Scenario Outline: Chip in fallido por cantidad invalida
    Given el usuario se encuentra en la seccion de chip in
    When ingresa el ID de usuario "13495400"
    And ingresa la cantidad de fichas "<cantidad>"
    And confirma el envio
    Then la web muestra mensaje de error "<mensaje_error>"

    Examples:
      | cantidad | mensaje_error                     |
      | 0        | La cantidad debe ser mayor a cero  |
      | -100     | La cantidad no puede ser negativa  |
      |          | La cantidad es requerida           |

  # ==================== CHIP OUT / DESCARGA ====================

  @pending
  Scenario Outline: Chip out exitoso desde la web
    Given el usuario se encuentra en la seccion de chip out
    And el usuario "13495400" tiene saldo suficiente en PPPoker
    When ingresa el ID de usuario "<id_usuario>"
    And ingresa la cantidad de fichas "<cantidad>" a retirar
    And confirma la operacion
    Then la web muestra el estado "Procesando"
    And la web muestra confirmacion "Chip out completado exitosamente"
    And el saldo del usuario en la web disminuye en "<cantidad>" fichas

    Examples:
      | id_usuario | cantidad |
      | 13495400   | 100      |
      | 13495400   | 500      |

  @pending
  Scenario: Chip out fallido por saldo insuficiente
    Given el usuario se encuentra en la seccion de chip out
    And el usuario "13495400" no tiene saldo suficiente en PPPoker
    When ingresa la cantidad de fichas "999999" a retirar
    And confirma la operacion
    Then la web muestra mensaje de error "Saldo insuficiente"

  @pending
  Scenario Outline: Chip out fallido por cantidad invalida
    Given el usuario se encuentra en la seccion de chip out
    When ingresa el ID de usuario "13495400"
    And ingresa la cantidad de fichas "<cantidad>" a retirar
    And confirma la operacion
    Then la web muestra mensaje de error "<mensaje_error>"

    Examples:
      | cantidad | mensaje_error                     |
      | 0        | La cantidad debe ser mayor a cero  |
      | -50      | La cantidad no puede ser negativa  |
      |          | La cantidad es requerida           |

  # ==================== HISTORIAL ====================

  @pending
  Scenario: Validar que el historial refleja el chip in realizado
    Given se completo un chip in exitoso de "100" fichas al usuario "13495400"
    When el usuario consulta el historial de transacciones
    Then aparece el registro del chip in con la cantidad "100"
    And el estado de la transaccion es "Completado"
    And la fecha y hora de la transaccion es correcta

  @pending
  Scenario: Validar que el historial refleja el chip out realizado
    Given se completo un chip out exitoso de "100" fichas del usuario "13495400"
    When el usuario consulta el historial de transacciones
    Then aparece el registro del chip out con la cantidad "100"
    And el estado de la transaccion es "Completado"
    And la fecha y hora de la transaccion es correcta
