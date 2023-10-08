'use client'

import React, { useState, useEffect } from 'react'
import { strings } from './strings'

interface CheckboxData {
  name: string
  checked: boolean
}

export default function ToDo() {
  const [foundation, setFoundation] = useState<CheckboxData[]>(() => {
    const storedData =
      typeof window !== 'undefined' ? localStorage.getItem('foundation') : null
    return storedData
      ? JSON.parse(storedData)
      : [
          { name: strings.foundation.setupVirtualOffice, checked: false },
          { name: strings.foundation.setMissionAndVision, checked: false },
          { name: strings.foundation.selectBusionessName, checked: false },
          { name: strings.foundation.buyDomain, checked: false },
        ]
  })
  const [discovery, setDiscovery] = useState<CheckboxData[]>(() => {
    const storedData =
      typeof window !== 'undefined' ? localStorage.getItem('discovery') : null
    return storedData
      ? JSON.parse(storedData)
      : [
          { name: strings.discovery.createRoadmap, checked: false },
          { name: strings.discovery.competitorAnalysis, checked: false },
        ]
  })
  const [delivery, setDelivery] = useState<CheckboxData[]>(() => {
    const storedData =
      typeof window !== 'undefined' ? localStorage.getItem('delivery') : null
    return storedData
      ? JSON.parse(storedData)
      : [
          { name: strings.delivery.releaseMarketingWebsite, checked: false },
          { name: strings.delivery.releaseMvp, checked: false },
        ]
  })
  const [foundationDone, setFoundationDone] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleChangeFoundation = (event: React.BaseSyntheticEvent) => {
    const { name, checked } = event.target
    setFoundation((prevState: CheckboxData[]) =>
      prevState.map((checkbox: CheckboxData) =>
        checkbox.name === name ? { ...checkbox, checked } : checkbox
      )
    )
  }
  const handleChangeDiscovery = (event: React.BaseSyntheticEvent) => {
    const { name, checked } = event.target

    setDiscovery((prevState: CheckboxData[]) =>
      prevState.map((checkbox: CheckboxData) =>
        checkbox.name === name ? { ...checkbox, checked } : checkbox
      )
    )
  }
  const handleChangeDelivery = (event: React.BaseSyntheticEvent) => {
    const { name, checked } = event.target
    setDelivery((prevState: CheckboxData[]) =>
      prevState.map((checkbox: CheckboxData) =>
        checkbox.name === name ? { ...checkbox, checked } : checkbox
      )
    )
  }

  useEffect(() => {
    localStorage.setItem('foundation', JSON.stringify(foundation))
  }, [foundation])

  useEffect(() => {
    localStorage.setItem('discovery', JSON.stringify(discovery))
  }, [discovery])

  useEffect(() => {
    localStorage.setItem('delivery', JSON.stringify(delivery))
  }, [delivery])

  const fetchData = async () => {
    const response = await fetch(
      'https://uselessfacts.jsph.pl/api/v2/facts/random'
    )
    try {
      const data = await response.json()
      setMessage(data.text)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (
      discovery.every((item: CheckboxData) => item.checked) &&
      foundation.every((item: CheckboxData) => item.checked) &&
      delivery.every((item: CheckboxData) => item.checked)
    ) {
      console.log('to je to')
      fetchData()
    }
  }, [foundation, delivery, discovery])

  return (
    <main
      suppressHydrationWarning={true}
      className="flex flex-row justify-center bg-white w-full min-h-screen"
    >
      <div>
        <h1 className="font-extrabold text-xl p-1 text-black">
          My startup progress
        </h1>
        <div className="flex flex-row align-center ml-1 mt-5">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white">
            <span className="text-lg font-bold">1</span>
          </div>
          <h2 className="ml-3 font-extrabold text-lg text-black">Foundation</h2>
          {foundation.every((item: CheckboxData) => item.checked) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000"
              className="w-8 h-10 -mt-2 ml-4"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
                stroke="#000"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
        <div className="my-5 pl-3 border-orange-700">
          {foundation.map((e: CheckboxData, idx: number) => {
            return (
              <div key={e.name} className="flex items-center">
                <input
                  id={e.name + idx}
                  type="checkbox"
                  name={e.name}
                  checked={e.checked}
                  disabled={foundation.every((item) => item.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  onChange={handleChangeFoundation}
                />
                <label
                  htmlFor="checkbox-item-1"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  {e.name}
                </label>
              </div>
            )
          })}
        </div>
        <div className="flex flex-row align-center ml-1">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white">
            <span className="text-lg font-bold">2</span>
          </div>
          <h2 className=" ml-3 font-extrabold text-lg text-black">Discovery</h2>
          {discovery.every((item: CheckboxData) => item.checked) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000"
              className="w-8 h-10 -mt-2 ml-4"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
                stroke="#000"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
        <div className="my-5 pl-3 border-orange-700">
          {discovery.map((e: CheckboxData, idx: number) => {
            return (
              <div key={e.name} className="flex items-center">
                <input
                  id={e.name + idx}
                  type="checkbox"
                  name={e.name}
                  checked={e.checked}
                  disabled={discovery.every((item) => item.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  onChange={handleChangeDiscovery}
                />
                <label
                  htmlFor="checkbox-item-1"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  {e.name}
                </label>
              </div>
            )
          })}
        </div>
        <div className="flex flex-row align-center ml-1">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black text-white">
            <span className="text-lg font-bold">3</span>
          </div>
          <h2 className=" ml-3 font-extrabold text-lg text-black">Delivery</h2>
          {delivery.every((item: CheckboxData) => item.checked) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000"
              className="w-8 h-10 -mt-2 ml-4"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
                stroke="#000"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
        <div className="my-5 pl-3 border-orange-700 w-full">
          {delivery.map((e: CheckboxData, idx: number) => {
            return (
              <div key={e.name} className="flex items-center">
                <input
                  id={e.name + idx}
                  type="checkbox"
                  name={e.name}
                  checked={e.checked}
                  disabled={delivery.every((item) => item.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  onChange={handleChangeDelivery}
                />
                <label
                  htmlFor="checkbox-item-1"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  {e.name}
                </label>
              </div>
            )
          })}
        </div>
        {message !== '' && (
          <p className="p-3 m-2 text-amber-700">{'-->' + message + '<--'}</p>
        )}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={() => {
            localStorage.setItem(
              'foundation',
              JSON.stringify([
                { name: strings.foundation.setupVirtualOffice, checked: false },
                {
                  name: strings.foundation.setMissionAndVision,
                  checked: false,
                },
                {
                  name: strings.foundation.selectBusionessName,
                  checked: false,
                },
                { name: strings.foundation.buyDomain, checked: false },
              ])
            )
            localStorage.setItem(
              'discovery',
              JSON.stringify([
                { name: strings.discovery.createRoadmap, checked: false },
                { name: strings.discovery.competitorAnalysis, checked: false },
              ])
            )
            localStorage.setItem(
              'delivery',
              JSON.stringify([
                {
                  name: strings.delivery.releaseMarketingWebsite,
                  checked: false,
                },
                { name: strings.delivery.releaseMvp, checked: false },
              ])
            )
            location.reload()
          }}
        >
          RESET
        </button>
      </div>
    </main>
  )
}
