import sql, { clearData, createTables, loadInitialData } from './config/db'

import {
  getCageByCode,
  getCagesByCaretaker
} from './controllers/CageController';

import {
  getCaretakersBySpecies,
  getCaretakerByMatriculation
} from './controllers/CaretakerController';

import {
  getSpeciesByHabitat,
  getSpeciesByScientificName
} from './controllers/SpeciesController';

import {
  getSpecimenByCage,
  getSpecimenBySpecies,
  getSpecimenByCaretaker
} from './controllers/SpecimenController';

const run = async () => {
  await createTables()
  await clearData()
  await loadInitialData()

  /**
   * Execute as funções responsáveis pelas consultas aqui!
   */
  let firstCage = await getCageByCode('00001');
  let cunhaAlvezJoao = await getCaretakerByMatriculation('12001'); 
  
  const forestSpecies = await getSpeciesByHabitat('floresta');
  const catSpecies = await getSpeciesByScientificName('Felis silvestris catus');
  const cats = await getSpecimenBySpecies(catSpecies);
  const firstCageSpecimen = await getSpecimenByCage(firstCage);
  const specimenCaredForByJoao = await getSpecimenByCaretaker(cunhaAlvezJoao);
  const cagesCaredForByJoao = await getCagesByCaretaker(cunhaAlvezJoao);
  const catLovers = await getCaretakersBySpecies(catSpecies);

  console.log('Espécies florestais'); console.table(forestSpecies);
  console.log('Felis silvestris catus'); console.table(catSpecies);
  console.log('Gatos'); console.table(cats);
  console.log('Espécimes da primeira jaula'); console.table(firstCageSpecimen);
  console.log('Espécimes cuidados pelo João'); console.table(specimenCaredForByJoao);
  console.log('Jaulas cuidadas pelo João'); console.table(cagesCaredForByJoao);
  
  console.log('Pais de pets felinos (zeladores que cuidam de espécimes de gatos)');
  console.table(catLovers);
  /**
   * Fim das consultas
   */

  await sql.end()
  console.log('Mal feito desfeito')
}

run()
