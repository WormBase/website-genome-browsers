const Plugin = JBrowseExports['@jbrowse/core/Plugin']

export default class HexJexlPlugin extends Plugin {
  name = 'HexJexlPlugin'

  install(pluginManager) {
    pluginManager.jexl.addFunction('hex', (num1) => {
      return num1.toString(16);
    })
  }
}
