const shippings = [
  {
    country: "Armenia",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 80
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 120
      }
    ]
  },
  {
    country: "Australia",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 83.3
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 145.3
      }
    ]
  },
  {
    country: "Austria",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 10
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 15
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 20
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 25
      }
    ]
  },
  {
    country: "Belarus",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Belgium",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 9.75
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 12
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 14
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 17
      }
    ]
  },
  {
    country: "Bosnia Herzegovina",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 36
      }
    ]
  },
  {
    country: "Bulgaria",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 16
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 23
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 30
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 35
      }
    ]
  },
  {
    country: "Canada",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 60
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 100
      }
    ]
  },
  {
    country: "Croatia",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 16
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 23
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 30
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 37
      }
    ]
  },
  {
    country: "Cyprus",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Czech republic",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 12
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 16
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 20
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 25
      }
    ]
  },
  {
    country: "Denmark",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 10
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 15
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 20
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 25
      }
    ]
  },
  {
    country: "Estonia",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 14
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 17
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 22
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 28
      }
    ]
  },
  {
    country: "Faroe Islands",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Finland",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 12
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 19
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dhl",
        cost: 24
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 32
      }
    ]
  },
  {
    country: "France",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 10
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 15
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 20
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 25
      }
    ]
  },
  {
    country: "Georgia",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 75
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 105
      }
    ]
  },
  {
    country: "Germany",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 9
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 12
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 19
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 24
      }
    ]
  },
  {
    country: "Greece",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Hungary",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 13
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 17
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 22
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 28
      }
    ]
  },
  {
    country: "Iceland",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Ireland",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 12
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 19
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dhl",
        cost: 24
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dhl",
        cost: 33
      }
    ]
  },
  {
    country: "Israel",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "parcelnl",
        cost: 46.75
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 65
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 85
      }
    ]
  },
  {
    country: "Italy",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 10
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 19
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 24
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 32
      }
    ]
  },
  {
    country: "Japan",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 83.3
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 125
      }
    ]
  },
  {
    country: "Kazachstan",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 83.3
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 125
      }
    ]
  },
  {
    country: "Latvia",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 14
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 17
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 22
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 28
      }
    ]
  },
  {
    country: "Lithuania",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 14
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 17
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 22
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 28
      }
    ]
  },
  {
    country: "Luxembourg",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 10.75
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 18
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 22
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 28
      }
    ]
  },
  {
    country: "Macedonia",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Malta",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 16
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 23
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dhl",
        cost: 30
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dhl",
        cost: 39
      }
    ]
  },
  {
    country: "Moldova",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Monaco",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 13
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 19.5
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 34
      }
    ]
  },
  {
    country: "Montenegro",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Netherlands",
    local: "NL",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 5.75
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 5.75
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dhl",
        cost: 5.75
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dhl",
        cost: 8.75
      }
    ]
  },
  {
    country: "New Zealand",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 83.3
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 145.3
      }
    ]
  },
  {
    country: "Norway",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 40
      }
    ]
  },
  {
    country: "Poland",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 12
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 17
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 22
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 28
      }
    ]
  },
  {
    country: "Portugal",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 12
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 19
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 24
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 30
      }
    ]
  },
  {
    country: "Romania",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 16
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 23
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 28
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 34
      }
    ]
  },
  {
    country: "Russia",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "parcelnl",
        cost: 45
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 56
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 75
      }
    ]
  },
  {
    country: "Serbia",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Slovakia",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 16
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 20
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 25
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 30
      }
    ]
  },
  {
    country: "Slovenia",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 16
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 20
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 25
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 30
      }
    ]
  },
  {
    country: "Spain",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 10
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dhl",
        cost: 12
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dhl",
        cost: 16
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dhl",
        cost: 22
      }
    ]
  },
  {
    country: "Sweden",
    local: "EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dhl",
        cost: 10
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 19
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 24
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 32
      }
    ]
  },
  {
    country: "Switzerland",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "dpd",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 40
      }
    ]
  },
  {
    country: "Tajikistan",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "parcelnl",
        cost: 48.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "parcelnl",
        cost: 74.5
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 120
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 175
      }
    ]
  },
  {
    country: "Turkey",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "Turkmenistan",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "parcelnl",
        cost: 48
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "parcelnl",
        cost: 74
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 120
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 175
      }
    ]
  },
  {
    country: "Ukraine",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "postnl",
        cost: 40
      }
    ]
  },
  {
    country: "United Kingdom",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 18.5
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "ups",
        cost: 25
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "ups",
        cost: 31
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "ups",
        cost: 40
      }
    ]
  },
  {
    country: "United States",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 83.3
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 124
      }
    ]
  },
  {
    country: "Uzbekistan",
    local: "non EU",
    options: [
      {
        minWeight: 0,
        maxWeight: 2000,
        operator: "postnl",
        cost: 29.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "postnl",
        cost: 46.8
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "postnl",
        cost: 83.3
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 132
      }
    ]
  }
]

export default shippings
