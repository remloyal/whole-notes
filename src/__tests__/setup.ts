// 全局测试设置文件 - 使用纯JavaScript实现，不依赖Vitest API

// Mock ResizeObserver，这是Vuetify组件常用的API
class MockResizeObserver {
  callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
})

// Mock matchMedia API - 使用纯JavaScript实现
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: function (query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return false
      },
    }
  },
})

// 模拟document.createElementNS用于处理SVG元素
const originalCreateElementNS = document.createElementNS
Object.defineProperty(document, 'createElementNS', {
  writable: true,
  value: function (namespaceURI: string, qualifiedName: string) {
    const element = originalCreateElementNS.call(document, namespaceURI, qualifiedName)
    return element
  },
})

// 添加一个简单的console.error拦截器，帮助调试
const originalConsoleError = console.error
Object.defineProperty(console, 'error', {
  writable: true,
  value: function (message?: any, ...optionalParams: any[]) {
    // 忽略一些已知的Vuetify测试警告
    if (
      typeof message === 'string' &&
      (message.includes('Vuetify') || message.includes('v-sheet'))
    ) {
      return
    }
    originalConsoleError.call(console, message, ...optionalParams)
  },
})
