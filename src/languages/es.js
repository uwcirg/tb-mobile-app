export default {
  home: {
    title: "Inicio Aquí.",
    survey: "Reportar la toma de medicamentos",
  },

  survey: {
    medication: "Tomo la medicacion hoy",

    symptoms: {
      nausea: "Náuseas o vómitos",
      redness: "Enrojectimiento de la piel, granitos, picazón",
      hives: "Urticaria",
      fever: "Fiebre",
      appetite_loss: "Pérdida de apetito",
      blurred_vision: "Visión borrosa o cambios en la forma de ver los colores",
      upset_stomach: "La barriga se siente sensible o dolorido",
      yellow_coloration: "Coloración amarillenta en la piel o en la parte blanca de los ojos",
      difficulty_breathing: "Dificultad para respirar",
      facial_swelling: "Hinchazón de la cara, los labios, la lengua, o la garganta",
    },
  },

  menu: {
    name: "Nombre",
    photo: "Foto",
    phone: "Telefono",
    language: "Lingua",
    treatment_start: "Dato del inicio del tratamiento",
    time_zone: "Zona horaria",
  },

  info: {
    faq: "Preguntas frecuentes y respuestas",
    symptom_overview: "Resumen de los síntomas y efectos secundarios",
  },

  symptom_overview: {
    title: "Resumen de los síntomas/efectos indeseables y estrategias para intentar en casa para reducir los efectos secundarios",
    intro_1: `
      Los medicamentos utilizados pueden provocar algunos efectos indeseables.
      ¿Qué hay que tener en cuenta para consultar con el equipo de salud?
      ¿Qué efectos podrían presentarse y en qué casos debería consultar?
      `,
    intro_2: `
      La mayoría de las personas pueden tomar los medicamentos para la TB sin ningún problema.
      `,
    intro_3: `
      Algunos efectos secundarios son mínimos y otros son más serios.
      Si tiene un efecto secundario grave,
      *llame a su médico o concurra a la guardia inmediatamente*.
      Es posible que le indiquen que deje de tomar sus medicamentos o que vaya
      a la clínica para que le hagan estudios.
      `,
    call_your_doctor_if: "Llame a su médico o concurra a la guardia de inmediato si tiene:",
    grave_symptoms: `
      Los efectos secundarios que se indican a continuación se consideran graves.
      Requieren intervención médica
      `,

    grave: {
      failing_appetite: "Falta de apetito",
      nausea: "Náuseas",
      vomiting: "Vómito",
      yellow_coloration: "Coloración amarilla de la piel o los ojos",
      fever_3_or_more_days: "Fiebre durante 3 o más días",
      abdominal_pain: "Dolor abdominal",
      placeholder_1: "Sensación de hormigueo en los dedos de las manos o de los pies",
      placeholder_2: "Dolor en la parte inferior del pecho y acidez estomacal",
      placeholder_3: "Comezón",
      placeholder_4: "Sarpullido",
      placeholder_5: "Aparición fácil de moretones",
      placeholder_6: "Sangrado en las encías",
      placeholder_7: "Sangrado en la nariz",
      placeholder_8: "Orina oscura o de color café",
      joint_pain: "Dolor en las articulaciones",
      placeholder_9: "Mareo",
      placeholder_10: "Sensación de hormigueo o entumecimiento alrededor de la boca",
      changes_in_vision: "Vista borrosa o cambios en la vista",
      placeholder_11: "Zumbido en los oídos",
      loss_of_hearing: "Pérdida de la audición",
    },

    q2: {
      heading: `
        Los efectos secundarios a continuación se consideran leves.
        No requieren intervención médica.
        `,

      take_medication: "Si tiene alguno de estos efectos secundarios, puede seguir tomando sus medicamentos.",
      rifampicina: "La rifampicina puede:",

      bullet_1: `
        Hacer que la orina, la saliva o las lágrimas tengan una coloración
        naranja. Es posible que el equipo de salud le aconsejen que no use
        lentes de contacto blandos porque pueden mancharse.
      `,
      bullet_2: `
        Aumentar su sensibilidad al sol. Esto significa que debe usar un buen
        filtro solar y cubrir las áreas expuestas para evitar quemaduras.
      `,
      bullet_3: `
        Hacer que las píldoras y los implantes anticonceptivos sean menos
        eficaces. Las mujeres que toman rifampicina deben usar otro método
        anticonceptivo.
      `,
      bullet_4: `
        Si usted está tomando rifampicina y metadona (que se usa para tratar
        las adicciones), es posible que tenga síntomas de abstinencia. Su
        médico o enfermera tal vez tengan que ajustarle la dosis de metadona.
      `,
    },

    q3: {
      heading: `
        Los efectos secundarios a continuación se consideran leves.
        No requieren intervención médica.
        `,

      take_medication: "Si tiene alguno de estos efectos secundarios, puede seguir tomando sus medicamentos.",
      rifampicina: "La rifampicina puede:",

      bullet_1: `
        Cuando hay intolerancia de tipo digestivo como náuseas, vómitos
        pueden utilizarse la metoclopramida (Reliveran gotas), ranitidina u
        omeprazol). Incluso hasta que mejoren los síntomas puede dividirse la
        toma de medicamentos 2 veces por día.
      `,
      bullet_2: `
        Cuando hay reacciones en la piel leves al comienzo del tratamiento,
        pueden tratarse con anthistamínicos (loratadina, difenhidramina)
      `,
      bullet_3: `
        En el caso de artralgias (dolor en las articulaciones) pueden
        utilizarse analgésicos o antinflamatorios. La pirazinamida suele
        causar estas molestias.
      `,
      bullet_4: `
        En los dolores musculares (polineuropatía) se utiliza complejo
        Vitamina B.
      `,
      bullet_5: `
        En Estados febriles hay que tener en cuenta que no sean ocasionados
        por fármacos
      `,
    },
  },

  faqs: {
    title: "Preguntas y respuestas sobre la tuberculosis",
    intro_1: `
      Esta es una lista de preguntas frecuentes sobre la tuberculosis (TB),
      medicamentos y otros temas relacionados con TB y las respuestas.
    `,
    intro_2: "Qué es, cómo se transmite, y cómo se trata la tuberculosis.",

    q1: {
      question: "¿Qué es?",
      answer: {
        1: `
          La tuberculosis o TB es una enfermedad causada por el bacilo de Koch o
          Mycobacterium tuberculosis.
          La infección principal de la enfermedad se produce en los pulmones,
          si bien puede atacar otras partes del cuerpo,
          la TB pulmonar es la única con capacidad de contagiar a otras personas
          que se encuentran en un contacto habitual y cercano varias horas en el
          día. Contagio que se produce a través del aire al
          toser/estornudar/hablar/cantar y eliminar con la tos las pequeñas
          gotitas que contienen a los bacilos vivos.
        `,
        2: `
          No todas las personas en contacto con un enfermo que elimina los
          bacilos con la tos, pueden llegar a enfermarse. Solamente en el caso
          que la otra persona tenga las defensas bajas, por la presencia de
          otras enfermedades como diabetes, otras infecciones como el virus del
          SIDA, tumores, trasplantes, mala nutrición, pueden llegar a
          enfermarse.
        `,
        3: `
          Con buenas defensas un individuo puede tomar contacto con el bacilo,
          pero no necesariamente puede llegar a enfermarse, sino a infectarse,
          sin desarrollar la enfermedad. En este caso conocido como infección.
          Estas personas no se sienten mal, no presentan síntomas ni pueden
          transmitir la tuberculosis a otras personas. Sin embargo, algunas
          personas con la infección se enferman más adelante de la enfermedad
          de tuberculosis.
        `,
        4: `
          La buena noticia es que las personas con la enfermedad de
          tuberculosis pueden recibir tratamiento y curarse.
        `,
      }
    },

    q2: {
      question: "¿Cómo se transmite?",
      answer: {
        1: `
          La tuberculosis se transmite de una persona a otra por el aire.
          Los bacilos se liberan en el aire
          cuando una persona con la enfermedad de tuberculosis en los pulmones
          o la garganta tose, estornuda, habla o canta.
          Las personas que se encuentran cerca
          pueden respirar estos bacilos e infectarse.
        `,
        2: `
          Cuando una persona respira las bacterias de la tuberculosis,
          estas pueden alojarse en los pulmones y comenzar a proliferar.
          Desde allí se pueden desplazar
          por la sangre hacia otras partes del cuerpo,
          como los riñones, la columna vertebral y el cerebro.
        `,
        3: `
          La enfermedad de tuberculosis en los pulmones o la garganta puede ser
          contagiosa. Esto significa que los bacilos pueden transmitirse a
          otras personas. La tuberculosis que afecta otras partes del cuerpo,
          como los riñones o la columna vertebral, por lo general no es
          contagiosa.
        `,
        4: `
          Las personas con la enfermedad de tuberculosis tienen más
          probabilidad de transmitirla a las personas con las que conviven
          todos los días, como familiares, amigos y compañeros de trabajo y de
          clase.
        `,
        5: `
          Es importante:
        `,
        "6-bullets": {
          1: `
            controlar a TODOS los contactos que viven con la persona que
            tiene TB.
          `,
          2: `
            Vacunar al recién nacido con la vacuna BCG para prevenir las
            formas graves TB
          `,
          3: `
            Cubrirse la boca al toser o estornudar.
          `,
          4: `
            Enseñar en las escuelas, en el barrio y en la comunidad que TODOS
            debemos participar de la lucha contra la Tuberculosis.
          `,
        },
      },
    },

    q3: {
      question: "¿Cuáles son las pruebas para detectar la infección?",
      answer: `
        Para conocer si una persona estuvo en contacto o no con el bacilo
        es a través de la prueba en la piel,
        la reacción de Mantoux o prueba tuberculínica.
      `,
    },

    q4: {
      question: "¿Cómo se trata?",
      answer: {
        1: `
          El tratamiento es altamente efectivo, pudiendo curar a todos los
          pacientes. La eficacia del tratamiento consiste en la toma regular y
          diaria de los medicamentos. Se necesita la combinación de varios
          medicamentos para eliminar la mayor cantidad de los bacilos sobre
          todo en los 2 primeros meses. El tratamiento debe continuarse con una
          segunda fase de 4 meses, necesaria para mater al resto de los bacilos
          que aún permanecen en el organismo.
        `,
        2: `
          Si usted tiene la enfermedad de tuberculosis en los pulmones o la
          garganta, es probable que la enfermedad sea contagiosa. Debe quedarse
          en su casa y no ir al trabajo o la escuela, para no transmitir las
          bacterias de la tuberculosis a otras personas. Después de tomar los
          medicamentos durante algunas semanas se sentirá mejor y es posible
          que la enfermedad ya no sea contagiosa. Su médico o enfermera le
          indicarán cuándo puede volver al trabajo, la escuela o a ver a sus
          amigos.
        `,
        3: `
          El hecho de tener la enfermedad de tuberculosis no debe impedirle
          llevar una vida normal. Cuando la enfermedad ya no sea contagiosa y
          usted no se sienta mal, podrá hacer las mismas cosas que hacía antes
          de la enfermedad.
        `,
        4: `
          Es importante el control del catarro principalmente en los 2 primeros
          meses, antes de pasar a la segunda fase del tratamiento, además de
          los análisis de rutina.
        `,
        5: `
          Utilizaría tratamiento directamente observado (TDO), cuando un
          personal de salud supervisa la toma de la medicación. En general, el
          tratamiento supervisado es realizado en un centro de salud cercano al
          domicilio. En los 2 primeros meses la supervisión en la toma de los
          medicamentos es diaria, mientras que en los siguientes 4 meses puede
          realizarse en tratamiento de 2 a 3 tomas por semana.
        `,
        6: `
          Hay muchas razones por las cuales las personas tienen problemas para
          tomar sus medicamentos. Pero en la mayoría de los casos, hay algo que
          se puede hacer.
        `,
        7: `
          Tanto el diagnóstico como el tratamiento de la Tuberculosis son
          gratuitos en los centros de salud y hospitales públicos de todo el
          país.
        `,
      },
    },

    q5: {
      question: "¿Cuáles son los efectos indeseables de los medicamentos para la tuberculosis?",
      answer: {
        1: `
          Los medicamentos utilizados pueden provocar algunos efectos indeseables que hay que tener en cuenta para consultar con el equipo de salud. Efectos puede ocasionarle y en algunos casos debería consultar.
        `,
        2: `
          Algunos efectos secundarios son mínimos y otros son más serios.
          Si tiene un efecto secundario grave,
          *llame a su médico o enfermera inmediatamente*.
          Es posible que le indiquen que deje de tomar sus medicamentos
          o que vaya a la clínica para que le hagan pruebas.
        `,
        3: `
          Llame a su médico u otros servicios de emergencia de inmediato si tiene:
        `,
        4: {
          1: `Dificultad para respirar.`,
          2: `Hinchazón de la cara, los labios, la lengua o la garganta`,
        },
        5: {
          1: `Los efectos secundarios que se indican a continuación se consideran graves.`,
          2: `Si tiene alguno de estos síntomas, llame inmediatamente a su médico o enfermera:`,
        },

        6: {
          1: `Falta de apetito`,
          2: `Náuseas`,
          3: `Vómito`,
          4: `Coloración amarilla de la piel o los ojos`,
          5: `Fiebre durante 3 o más días`,
          6: `Dolor abdominal`,
          7: `Sensación de hormigueo en los dedos de las manos o de los pies`,
          8: `Dolor en la parte inferior del pecho y acidez estomacal`,
          9: `Comezón`,
          10: `Sarpullido`,
          11: `Aparición fácil de moretones`,
          12: `Sangrado en las encías`,
          13: `Sangrado en la nariz`,
          14: `Orina oscura o de color café`,
          15: `Dolor en las articulaciones`,
          16: `Mareo`,
          17: `Sensación de hormigueo o entumecimiento alrededor de la boca`,
          18: `Vista borrosa o cambios en la vista`,
          19: `Zumbido en los oídos`,
          20: `Pérdida de la audición`,
        },

        7: {
          1: `Los efectos secundarios a continuación se consideran leves.`,
          2: `Si tiene alguno de estos efectos secundarios, puede seguir tomando sus medicamentos.`,
        },

        rifampicina: "La rifampicina puede:",
        "rifampicina-bullets": {
          1: `
            Hacer que la orina, la saliva o las lágrimas tengan una coloración
            naranja. Es posible que el equipo de salud le aconsejen que no use
            lentes de contacto blandos porque pueden mancharse.
          `,
          2: `
            Aumentar su sensibilidad al sol. Esto significa que debe usar un
            buen filtro solar y cubrir las áreas expuestas para evitar
            quemaduras.
          `,
          3: `
            Hacer que las píldoras y los implantes anticonceptivos sean menos
            eficaces. Las mujeres que toman rifampicina deben usar otro método
            anticonceptivo.
          `,
          4: `
            Si usted está tomando rifampicina y metadona (que se usa para
            tratar las adicciones), es posible que tenga síntomas de
            abstinencia. Su médico o enfermera tal vez tengan que ajustarle la
            dosis de metadona.
          `,
        },
      },
    },

    q6: {
      question: "¿Por qué tengo que tomar medicamentos para la tuberculosis en forma regular?",
      answer: {
        1: `
          Las bacterias de la tuberculosis mueren muy lentamente. Los
          medicamentos tardan por lo menos 6 meses en destruir todas las
          bacterias de la tuberculosis. Usted probablemente empezará a sentirse
          bien después de solo algunas semanas de tratamiento. ¡Pero tenga en
          cuenta lo siguiente! Las bacterias de la tuberculosis aún están vivas
          en su cuerpo. Debe seguir tomando sus medicamentos hasta que todas
          las bacterias de la tuberculosis estén muertas, aun cuando usted se
          sienta mejor y no tenga más síntomas de enfermedad de tuberculosis.
        `,
        2: `
          Puede ser muy peligroso si no sigue tomando sus medicamentos o si no
          los toma en forma regular. Las bacterias de la tuberculosis se
          multiplicarán nuevamente y usted seguirá enfermo por más tiempo.
          Además, las bacterias pueden volverse resistentes a los medicamentos
          que esté tomando. Es posible que necesite medicamentos diferentes
          para eliminar las bacterias de la tuberculosis si los que usaba antes
          ya no le funcionan. Estos nuevos medicamentos se deben tomar durante
          más tiempo y, por lo general, tienen efectos secundarios más graves.
        `,
        3: `Si su enfermedad vuelve a ser contagiosa,
            podría transmitir las bacterias de la tuberculosis a su familia,
            sus amigos o a cualquier persona que pase tiempo con usted.
            Es muy importante que tome sus medicamentos
            de acuerdo a las indicaciones de su médico o enfermera.
        `,
      },
    },

    q7: {
      question: "¿Cómo puedo acordarme de tomar mis medicamentos?",

      answer: {
        1: `La única forma curarse es tomando sus medicamentos exactamente
            según las indicaciones de su médico/a o enfermero/a.
            ¡Puede que no sea fácil!
            ya que deberá tomar sus medicamentos
            durante un tiempo prolongado (6 meses),
            es bueno que establezca una rutina.
            Estas son algunas formas de acordarse de tomar sus medicamentos:
        `,

        2: {
          1: `Tomar sus medicamentos todos los días a la misma hora, por ejemplo,
              antes del desayuno, al hacer una pausa regular
              como para tomarse un café o después de cepillarse los dientes.`,

          2: `Pedir a un familiar o amigo que le recuerde tomar sus píldoras.`,

          3: `Marcar en un calendario cada día que tome sus medicamentos.`,

          4: `Colocar sus medicamentos en un pastillero semanal.
              Téngalo junto a su cama o en su cartera o bolsillo.`,

        },

        "3-note": `Recuerde mantener todos los medicamentos fuera del alcance de los niños.`,

        4: `Si se olvida un día de tomar sus medicamentos,
            sáltese esa dosis y espere a tomar la dosis que le toca después.
            Infórmele a su médico o su enfermera que dejó de tomar una dosis.
            También los puede llamar para preguntar qué debe hacer.`,

        5: `Preguntas de pacientes en el último estudio:`,

        "6-bullets": {

          1: `¿Cómo se contagia la Tuberculosis?
              Al respirar y no hablar en una habitación
              se contagia de la tuberculosis?`,

          2: `¿Alguna de las pastillas puede dar alguna reacción alérgica?
              Porqué me salen como unas ronchitas que me pican?`,

          3: `Puedo estar en la cama de mi mamá?`,

          4: `A noche traspire mucho estaba toda mojada`,

          5: `Podría tomar algún suplemento vitamínico,
              como esos que vienen para hacer batidos, estilo "ensure"?`,

          6: `Me duele mucho el pecho`,

          7: `Ya voy 1 mes de tratamiento todavía contagio?
              Se que tengo para 6 meses para seguir.`,

          8: `Hasta cuando tengo que usar el barbijo?`,

          9: `El síntoma es los dolores de hombro, brazos, y mano,
              no sé si son los huesos,
              estoy desde el lunes esto es normal?`,

          10: `La persona que están con este tratamiento al embarazarse
              que consecuencias trae, o no pueden embarazarse?`,
        },
      },
    },
  },
}
