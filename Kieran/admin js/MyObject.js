class MyObject {

  constructor(params) {
    const { handleUpdate, field, data, refs, options } = params
    this.propreties = {}

    this.handleSave = () => {
      handleUpdate(this.propreties);
    }

    if (refs) {
      console.log(`object with refs`)
    }
    if (options) {
      console.log(`object with options`)

    }

    const cloneData = (data) => {
      if (typeof data === 'object' && !Array.isArray(data)) {
        const obj = {}
        for (const [key, value] of Object.entries(data)) {
          obj[key] = cloneData(value)
        }
        return obj
      } else if (Array.isArray(data)) {
        return [...data]
      } else {
        return data
      }
    }

    this.propreties = cloneData(data)

    //render custom element 👍
    // - simple text / multiligne text ???
    // - 

  }

  goUpdate() {
    this.propreties.push('jffff')
    this.handleSave()
  }
}

async function loadObject(file, cb) {
  const response = await fetch(file)
  const result = await response.json()
  return cb(result)
}


const getActivity = (id) => (datas) => {
  return { refs: datas[0].refs, activity: datas[1].activities[id - 1] }
}


const id = 3
const fields = ["title", "description", "types", "dates", "horaire", "price", "booking", "bookinglinks", "illustration", "duration", "organisateur", "location", "public", "language"]
const objetcs = []
// check langue, Français par défaut
const currentLang = ['fr', 'nl', 'en']
  .includes(document.documentElement.lang)
  ? document.documentElement.lang
  : 'fr'


function main({ refs, activity }, schema) {

  const getMappingRefs = (field, datas) => {
    const refsField = refs[field][currentLang] ?? refs[field]
    return datas.map(data => refsField[data])
  }

  const handleUpdateField = (field, newValues) => {
    console.log(newValues, activity[field])
    activity[field] = newValues
  }

  fields.forEach(field => {
    const data = activity[field]
    objetcs.push(new MyObject(
      {
        handleUpdate: (result) => handleUpdateField(field, result),
        field,
        data,
        refs: Array.isArray(data) && !data.some(isNaN) ? refs[field] : null,
        options: schema[field]?.options
      }
    ))
  })


}

loadObject('./activities.json', getActivity(id))
  .then(datas => {
    loadObject('./schema.json', s => s)
      .then(schema => main(datas, schema))
  })

document.getElementById('theBtn').addEventListener('click', () => objetcs[2].goUpdate())


/**
 * 
 * @param {Element} element 
 * @param {object} oldValues 
 * @param {object} newValues 
 */
function replaceDataInNode(element, oldValues, newValues) {
  let html = element.innerHTML
  if (typeof oldValues === 'object' && !Array.isArray(oldValues)) {
    if (newValues[currentLang]) {
      html.replace(oldValues[currentLang], newValues[currentLang])
    } else {
      for (const [key, value] of Object.entries(oldValues)) {
        html = html.replace(value, newValues[key])
      }
    }
  } else {
    html.replace(oldValues, newValues)
  }

  element.innerHTML = html
}

/**
 * 
 * Récupérer les valeurs des refs (selon langue !?)
 * Compter l'ancien et le nouveau nombre d'item
 * Supprimer ou ajouter des noeuds
 */
function replaceDataInList(field, newValue, refs) {
  const elem = document.querySelector(`[dataset="${field}"`)
  const countOld = elem.childElementCount
  const countNew = newValue.lenght
  const valuesText = newValue.map(value => refs[currentLang] ? refs[currentLang][value] : refs[value])

  if (elem.firstElementChild && elem.firstElementChild.tagName !== 'BR') {

  } else {

  }


}