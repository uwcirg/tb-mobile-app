import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';

import './Symptoms.css';

const SymptomOverview = () => <div className='row'>
    <TopBar header='Información y Educación' />
    <div className='main'>
        <div className='symptoms info-text'>
            <h5>Resumen de los síntomas/efectos indeseables y estrategias para intentar en casa para reducir los efectos secundarios</h5>
            <p>Los medicamentos utilizados pueden provocar algunos efectos indeseables que hay que tener en cuenta para consultar con el equipo de salud. Efectos puede ocasionarle y en algunos casos debería consultar.</p>
            <p><strong>Lo bueno es que </strong>la mayoría de las personas pueden tomar los medicamentos para la TB sin ningún problema.</p>
            <p>Algunos efectos secundarios son mínimos y otros son más serios. Si tiene un efecto secundario grave, <strong>llame a su médico o ir a la guardia inmediatamente.</strong> Es posible que le indiquen que deje de tomar sus medicamentos o que vaya a la clínica para que le hagan pruebas.</p>
            <p>
                <u>Llame a su médico u otros servicios de emergencia de inmediato si tiene:</u>
                <ul>
                    <li>Dificultad para respirar.</li>
                    <li>Hinchazón de la cara, los labios, la lengua o la garganta</li>
                </ul>
            </p>
            <p>
                <u>Los efectos secundarios que se indican a continuación se consideran <strong>graves.</strong></u> Si tiene alguno de estos síntomas, llame inmediatamente a su médico o enfermera:
                <ul>
                    <li>Falta de apetito</li>
                    <li>Náuseas</li>
                    <li>Vómito</li><li>Coloración amarilla de la piel o los ojos
                    
                    </li><li>Fiebre durante 3 o más días
                                        
                    </li><li>Dolor abdominal
                                        
                    </li><li>Sensación de hormigueo en los dedos de las manos o de los pies
                                        
                    </li><li>Dolor en la parte inferior del pecho y acidez estomacal
                                        
                    </li><li>Comezón
                                        
                    </li><li>Sarpullido
                                        
                    </li><li>Aparición fácil de moretones
                                        
                    </li><li>Sangrado en las encías
                                        
                    </li><li>Sangrado en la nariz
                                        
                    </li><li>Orina oscura o de color café
                                        
                    </li><li>Dolor en las articulaciones
                                        
                    </li><li>Mareo
                    </li><li>Sensación de hormigueo o entumecimiento alrededor de la boca
                    </li><li>Vista borrosa o cambios en la vista
                    </li><li>Zumbido en los oídos
                    </li><li>Pérdida de la audición</li>
                </ul>
            </p>
            <p>
                <u>Los efectos secundarios a continuación se consideran <strong>leves.</strong></u> Si tiene alguno de estos efectos secundarios, puede seguir tomando sus medicamentos.
                La rifampicina puede:
                <ul>
                    <li>Hacer que la orina, la saliva o las lágrimas tengan una coloración naranja. Es posible que el equipo de salud le aconsejen que no use lentes de contacto blandos porque pueden mancharse.</li>
                    <li>Aumentar su sensibilidad al sol. Esto significa que debe usar un buen filtro solar y cubrir las áreas expuestas para evitar quemaduras.</li>
                    <li>Hacer que las píldoras y los implantes anticonceptivos sean menos eficaces. Las mujeres que toman rifampina deben usar otro método anticonceptivo.</li>
                    <li>Si usted está tomando rifampina y metadona (que se usa para tratar la drogadicción), es posible que tenga síntomas de abstinencia. Su médico o enfermera tal vez tengan que ajustarle la dosis de metadona.</li>
                </ul>
            </p>

            <h5>Estrategias para intentar en casa para reducir los efectos secundarios</h5>
            <p>
                En cuanto a los medicamentos en casos de efectos indeseables:
                <ul>
                    <li>Cuando hay intolerancia de tipo digestivo como náuseas, vómitos pueden utilizarse la metoclopramida (Reliveran gotas), ranitidina u omeprazol). Incluso hasta que mejoren los síntomas puede dividirse la toma de medicamentos 2 veces por día.
                    </li><li>Cuando hay reacciones en la piel leves al comienzo del tratamiento, pueden tratarse con anthistamínicos (loratadina, difenhidramina)
                    </li><li>En el caso de artralgias pueden utilizarse analgésicos o antinflamatorios. Va a depender de los resultados del laboratorio pensando en la pirazinamida como la causante.
                    </li><li>En los dolores musculares (polineuropatía) se utiliza complejo Vitamina B.
                    </li><li>Estados febriles hay que tener en cuanta que no sea por fármacos o en el caso del VIH. Si bien, la tuberculosis puede ocasionarla, ver si al suspender los fármacos, la fiebre desaparece, con lo cual se deberá reinstituir el tratamiento, cada medicamento uno por vez, como en la hepatotoxicidad.
                    </li>
                </ul>
            </p>

            





        </div>
        <BottomNav />
    </div>
</div>


export default SymptomOverview;