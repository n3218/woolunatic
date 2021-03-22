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
        cost: 76.67
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 112.37
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
        cost: 12.81
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 12.81
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 12.81
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
        cost: 9.4
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 9.4
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 9.4
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 9.4
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
        cost: 32.38
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
        cost: 26.59
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 26.59
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
        cost: 52.5
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 91.28
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
        cost: 22.5
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 22.5
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 22.5
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
        cost: 10.1
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 10.1
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 10.1
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 10.1
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
        cost: 12.81
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 12.81
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 12.81
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
        cost: 13.3
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 13.3
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 13.3
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 13.3
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
        cost: 26.5
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
        cost: 13.67
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 13.67
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 13.67
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
        cost: 73.02
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 101.02
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
        cost: 8.98
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 8.98
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 8.98
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 8.98
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
        cost: 11.2
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 11.2
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 11.2
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 11.2
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
        cost: 44.74
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 56.1
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 70.95
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
        cost: 22.22
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 22.22
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
        cost: 108.47
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
        cost: 110.48
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
        cost: 12.89
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 12.89
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 12.89
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 12.89
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
        cost: 11.27
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 11.27
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 11.27
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 11.27
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
        cost: 11.11
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 11.11
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 11.11
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
        cost: 23.51
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 23.51
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 23.51
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
        cost: 11.96
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 11.96
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 11.96
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 11.96
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
        cost: 22.22
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 22.22
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
        cost: 25.4
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 25.4
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
        cost: 41.4
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 53.57
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 69
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
        cost: 12.99
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 12.99
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 12.99
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 12.99
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
        cost: 13.59
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 13.59
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 13.59
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 13.59
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
        cost: 17.1
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 17.1
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 17.1
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
        cost: 17.95
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "dpd",
        cost: 17.95
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "dpd",
        cost: 17.95
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "dpd",
        cost: 17.95
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
        cost: 38.41
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "parcelnl",
        cost: 64.53
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 109.59
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 162.79
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
        cost: 38.34
      },
      {
        minWeight: 2001,
        maxWeight: 5000,
        operator: "parcelnl",
        cost: 64.24
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "parcelnl",
        cost: 109.72
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "parcelnl",
        cost: 167.29
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
        cost: 23.54
      },
      {
        minWeight: 5001,
        maxWeight: 10000,
        operator: "ups",
        cost: 25.53
      },
      {
        minWeight: 10001,
        maxWeight: 20000,
        operator: "ups",
        cost: 34.92
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
        cost: 112.2
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
        cost: 122.76
      }
    ]
  }
]

export default shippings
